'use strict'

// log on files
const logger = require('console-files')
// try to get freight from Correios Offline database
const correiosOfflineClient = require(process.cwd() + '/lib/correios-offline/client')
// list of CEPs saved to Correios Offline
const zipCodeRanges = require(process.cwd() + '/assets/correios-offline/zip-code-ranges.json')
// calculate freight from Correios WS
const correiosCalculate = require(process.cwd() + '/lib/correios-ws/calculate')

// find best matched zip code from mocked list
const findBaseZipCode = zipCode => {
  const zipCodeRange = zipCodeRanges.find(zipCodeRange => {
    return zipCodeRange[0] <= zipCode && zipCodeRange[1] >= zipCode
  })
  if (zipCodeRange) {
    return zipCodeRange[0]
  }
  return null
}

// store Correios WS temporary state
let isWsSlow = false

module.exports = appSdk => {
  return (req, res) => {
    // body was already pre-validated on @/bin/web.js
    // treat module request body
    const { params, application } = req.body
    // app configured options
    const config = Object.assign({}, application.data, application.hidden_data)

    // Correios calculate params
    let nCdServico, sCdMaoPropria, sCdAvisoRecebimento
    let nVlPeso = 0
    let nVlValorDeclarado = 0
    let nCdEmpresa = ''
    let sDsSenha = ''

    // check for configured Correios contract
    const contract = config.correios_contract
    if (contract) {
      const code = typeof contract.code === 'string' && contract.code.trim()
      if (code) {
        nCdEmpresa = code
        const password = typeof contract.password === 'string' && contract.password.trim()
        if (password) {
          sDsSenha = password
        }
      }
    }

    const sCepDestino = params.to ? params.to.zip.replace(/\D/g, '') : ''
    const sCepOrigem = params.from
      ? params.from.zip.replace(/\D/g, '')
      : config.zip ? config.zip.replace(/\D/g, '') : ''

    const checkZipCode = rule => {
      // validate rule zip range
      if (sCepDestino && rule.zip_range) {
        const { min, max } = rule.zip_range
        return Boolean((!min || sCepDestino >= min) && (!max || sCepDestino <= max))
      }
      return true
    }

    // start mounting response body
    // https://apx-mods.e-com.plus/api/v1/calculate_shipping/response_schema.json?store_id=100
    const response = {
      shipping_services: []
    }
    // search for configured free shipping rule
    if (Array.isArray(config.shipping_rules)) {
      for (let i = 0; i < config.shipping_rules.length; i++) {
        const rule = config.shipping_rules[i]
        if (rule.free_shipping && checkZipCode(rule)) {
          if (!rule.min_amount) {
            response.free_shipping_from_value = 0
            break
          } else if (!(response.free_shipping_from_value <= rule.min_amount)) {
            response.free_shipping_from_value = rule.min_amount
          }
        }
      }
    }

    // params object follows calculate shipping request schema:
    // https://apx-mods.e-com.plus/api/v1/calculate_shipping/schema.json?store_id=100
    if (!params.to) {
      // respond only with free shipping option
      res.send(response)
      return
    }

    if (!sCepOrigem) {
      // must have configured origin zip code to continue
      return res.status(400).send({
        error: 'CALCULATE_ERR',
        message: 'Zip code is unset on app hidden data (merchant must configure the app)'
      })
    }

    // optinal predefined or configured service codes
    if (params.service_code) {
      nCdServico = params.service_code
    } else if (Array.isArray(config.services) && config.services[0]) {
      const firstServiceCode = config.services[0].service_code
      if (firstServiceCode) {
        nCdServico = firstServiceCode
        for (let i = 1; i < config.services.length; i++) {
          nCdServico += `,${config.services[i].service_code}`
        }
      }
    }

    // optional params to Correios services
    if (params.subtotal && !config.no_declare_value) {
      nVlValorDeclarado = params.subtotal
    }
    if (params.own_hand) {
      sCdMaoPropria = 's'
    }
    if (params.receipt) {
      sCdAvisoRecebimento = 's'
    }

    // calculate weight and pkg value from items list
    if (params.items) {
      const pkg = {
        dimensions: {
          width: {
            value: 0,
            unit: 'cm'
          },
          height: {
            value: 0,
            unit: 'cm'
          },
          length: {
            value: 0,
            unit: 'cm'
          }
        },
        weight: {
          value: 0,
          unit: 'kg'
        }
      }

      params.items.forEach(({ price, quantity, dimensions, weight }) => {
        let physicalWeight = 0
        let cubicWeight = 0
        if (!params.subtotal && !config.no_declare_value) {
          nVlValorDeclarado += price * quantity
        }

        // sum physical weight
        if (weight && weight.value) {
          switch (weight.unit) {
            case 'kg':
              physicalWeight = weight.value
              break
            case 'g':
              physicalWeight = weight.value / 1000
              break
            case 'mg':
              physicalWeight = weight.value / 1000000
          }
          pkg.weight.value += physicalWeight * quantity
        }

        // sum total items dimensions to calculate cubic weight
        if (dimensions) {
          const sumDimensions = {}
          for (const side in dimensions) {
            const dimension = dimensions[side]
            if (dimension && dimension.value) {
              let dimensionValue
              switch (dimension.unit) {
                case 'cm':
                  dimensionValue = dimension.value
                  break
                case 'm':
                  dimensionValue = dimension.value * 100
                  break
                case 'mm':
                  dimensionValue = dimension.value / 10
              }
              // add/sum current side to final dimensions object
              if (dimensionValue) {
                sumDimensions[side] = sumDimensions[side]
                  ? sumDimensions[side] + dimensionValue
                  : dimensionValue
              }
            }
          }

          // calculate cubic weight
          // https://suporte.boxloja.pro/article/82-correios-calculo-frete
          // (C x L x A) / 6.000
          for (const side in sumDimensions) {
            if (sumDimensions[side]) {
              cubicWeight = cubicWeight > 0
                ? cubicWeight * sumDimensions[side]
                : sumDimensions[side]
              pkg.dimensions[side].value += sumDimensions[side] * quantity
            }
          }
          if (cubicWeight > 0) {
            cubicWeight /= 6000
          }
        }
        if (!config.free_no_weight_shipping || physicalWeight > 0) {
          nVlPeso += (quantity * (cubicWeight < 5 || physicalWeight > cubicWeight ? physicalWeight : cubicWeight))
        }
      })

      // pre check for maximum allowed declared value
      if (nVlValorDeclarado > 10000) {
        nVlValorDeclarado = 10000
      }

      // send requests to both Correios offline and WS
      const firstCalculateResult = new Promise(resolve => {
        let countErrors = 0
        let errorMsg
        const handleErrors = err => {
          countErrors++
          errorMsg += `- ${err.message}`
          if (countErrors === 2 && !res.headersSent) {
            // both WS and offline failed
            return res.status(400).send({
              error: 'CALCULATE_FAILED',
              message: errorMsg
            })
          }
        }

        const offlineListParams = {
          sCepOrigem: nCdEmpresa ? sCepOrigem : findBaseZipCode(sCepOrigem),
          sCepDestino: findBaseZipCode(sCepDestino),
          nCdEmpresa,
          // optinal predefined service code
          Codigo: params.service_code
        }

        // mannually handle WS timeout
        const timeout = 8000
        let isTimedOut = false
        let correiosWsTimer = setTimeout(() => {
          isWsSlow = true
          correiosWsTimer = setTimeout(() => {
            logger.log('Correios WS timed out')
            handleErrors(new Error('WS timed out'))
            isTimedOut = true
          }, timeout - 4000)
        }, 4000)

        // handle delay to send Correios offline request
        // prefer Correios WS
        let correiosOfflineTimer
        correiosCalculate({
          sCepOrigem,
          sCepDestino,
          nCdEmpresa,
          sDsSenha,
          nCdServico,
          sCdMaoPropria,
          sCdAvisoRecebimento,
          nVlPeso,
          nVlValorDeclarado
        }, timeout)
          .then(result => {
            if (result) {
              if (!isTimedOut) {
                clearTimeout(correiosOfflineTimer)
                clearTimeout(correiosWsTimer)
                resolve(result)
                isWsSlow = false
              }

              // save to offline database
              try {
                const { services } = result
                for (let i = 0; i < services.length; i++) {
                  if (services[i]) {
                    const { Codigo, Valor, PrazoEntrega, Erro } = services[i]
                    if (Valor && PrazoEntrega) {
                      correiosOfflineClient.insert({
                        ...offlineListParams,
                        nVlPeso: nVlPeso > 0.1 ? nVlPeso : 0.1,
                        Codigo,
                        Valor,
                        PrazoEntrega,
                        Erro,
                        MsgErro: ''
                      })
                    }
                  }
                }
              } catch (e) {
                // ignore
              }
            }
          })
          .catch(handleErrors)

        if (!config.disable_correios_offline) {
          if (offlineListParams.sCepOrigem && offlineListParams.sCepDestino) {
            // start timer to send Correios offline request
            correiosOfflineTimer = setTimeout(() => {
              logger.log(`Trying Correios Offline for #${offlineListParams.sCepOrigem}`)
              correiosOfflineClient.list(offlineListParams)

                .then(results => {
                  // filter results firts
                  const validResults = results.filter(result => {
                    if (nCdServico) {
                      // check results service code
                      const availableServiceCodes = nCdServico.split(',')
                      if (availableServiceCodes.indexOf(result.Codigo) === -1) {
                        // service not available
                        return false
                      }
                    }
                    // also removes results with low weight
                    return result.nVlPeso >= nVlPeso
                  })

                  if (validResults.length) {
                    // resolve with best result per service code only
                    const cServico = validResults.reduce((bestResults, result) => {
                      const index = bestResults.findIndex(({ Codigo }) => Codigo === result.Codigo)
                      if (index > -1) {
                        // keep lowest weight
                        if (bestResults[index].nVlPeso > result.nVlPeso) {
                          // overwrite result object
                          bestResults[index] = result
                        }
                      } else {
                        // any result for current service code yet
                        // add new result object
                        bestResults.push(result)
                      }
                      return bestResults
                    }, [])
                    resolve({ cServico, fromOffline: true })
                  } else {
                    logger.log(`No offline valid results for:\n${JSON.stringify(offlineListParams, null, 2)}`)
                    handleErrors(new Error('Results from offline data invalidated'))
                  }
                })

                .catch(handleErrors)
            }, isWsSlow ? 300 : 3000)
          }
        }
      })

      firstCalculateResult.then(({ Servicos, cServico, fromOffline }) => {
        // set services array from `Servicos` or `cServico`
        let services
        if (Servicos) {
          if (Array.isArray(Servicos)) {
            services = Servicos
          } else if (Servicos.cServico) {
            services = Array.isArray(Servicos.cServico) ? Servicos.cServico : [Servicos.cServico]
          }
        }
        if (!services) {
          services = Array.isArray(cServico) ? cServico : [cServico]
        }

        if (services[0] && services[0].Codigo) {
          let errorMsg
          services.forEach(service => {
            // check error first
            let { Erro, MsgErro, PrazoEntrega, url } = service
            let notes
            PrazoEntrega = parseInt(PrazoEntrega, 10)
            // known Correios errors
            switch (Erro) {
              case '010':
              case 10:
                Erro = false
                notes = MsgErro
                break
              case '011':
              case 11:
                Erro = false
                PrazoEntrega += 7
                break
            }

            if ((!Erro || Erro === '0') && PrazoEntrega > 0) {
              // fix price strings to number
              ;[
                'Valor',
                'ValorSemAdicionais',
                'ValorMaoPropria',
                'ValorAvisoRecebimento',
                'ValorValorDeclarado'
              ].forEach(field => {
                switch (typeof service[field]) {
                  case 'number':
                    break
                  case 'string':
                    service[field] = parseFloat(service[field].replace('.', '').replace(',', '.'))
                    break
                  default:
                    service[field] = 0
                }
              })
              let {
                Codigo,
                Valor,
                ValorSemAdicionais,
                ValorMaoPropria,
                ValorAvisoRecebimento,
                ValorValorDeclarado
              } = service

              if (fromOffline) {
                if (config.correios_offline_value_margin) {
                  // percentual addition/discount for Correios offline results
                  Valor *= (1 + config.correios_offline_value_margin / 100)
                }
                ValorSemAdicionais = Valor
                // sum additional services to total value
                if (nVlValorDeclarado) {
                  // https://github.com/ecomclub/app-correios#about-correios-offline
                  ValorValorDeclarado = (nVlValorDeclarado - 20.5) * 0.02
                  Valor += ValorValorDeclarado
                }
                if (sCdMaoPropria) {
                  ValorMaoPropria = config.own_hand_price || 7
                  Valor += ValorMaoPropria
                }
                if (sCdAvisoRecebimento) {
                  ValorAvisoRecebimento = config.receipt_price || 6
                  Valor += ValorAvisoRecebimento
                }
              }

              // find respective configured service label
              let serviceName
              switch (Codigo) {
                case '04014':
                  serviceName = 'SEDEX'
                  break
                case '04510':
                  serviceName = 'PAC'
              }
              let label = serviceName || `Correios ${Codigo}`
              if (Array.isArray(config.services)) {
                for (let i = 0; i < config.services.length; i++) {
                  const service = config.services[i]
                  if (service && service.service_code === Codigo && service.label) {
                    label = service.label
                  }
                }
              }

              // parse to E-Com Plus shipping line object
              const shippingLine = {
                from: {
                  ...params.from,
                  zip: sCepOrigem
                },
                to: params.to,
                package: pkg,
                price: ValorSemAdicionais || Valor,
                declared_value: nVlValorDeclarado,
                declared_value_price: ValorValorDeclarado > 0 ? ValorValorDeclarado : 0,
                own_hand: Boolean(sCdMaoPropria),
                own_hand_price: ValorMaoPropria,
                receipt: Boolean(sCdAvisoRecebimento),
                receipt_price: ValorAvisoRecebimento,
                discount: 0,
                total_price: Valor,
                delivery_time: {
                  days: PrazoEntrega,
                  working_days: true
                },
                posting_deadline: {
                  days: 3,
                  ...config.posting_deadline
                },
                flags: [`correios-${(fromOffline ? 'offline' : 'ws')}`, `correios-${(isWsSlow ? 'slow' : 'normal')}`],
                notes
              }

              // check for default configured additional/discount price
              if (typeof config.additional_price === 'number' && config.additional_price) {
                if (config.additional_price > 0) {
                  shippingLine.other_additionals = [{
                    tag: 'additional_price',
                    label: 'Adicional padrão',
                    price: config.additional_price
                  }]
                } else {
                  // negative additional price to apply discount
                  shippingLine.discount -= config.additional_price
                }
                // update total price
                shippingLine.total_price += config.additional_price
              }

              // search for discount by shipping rule
              if (Array.isArray(config.shipping_rules)) {
                for (let i = 0; i < config.shipping_rules.length; i++) {
                  const rule = config.shipping_rules[i]
                  if (
                    rule &&
                    (!rule.service_code || rule.service_code === Codigo) &&
                    checkZipCode(rule) &&
                    !(rule.min_amount > params.subtotal)
                  ) {
                    // valid shipping rule
                    if (rule.free_shipping) {
                      shippingLine.discount += shippingLine.total_price
                      shippingLine.total_price = 0
                      break
                    } else if (rule.discount) {
                      let discountValue = rule.discount.value
                      if (rule.discount.percentage) {
                        discountValue *= (shippingLine.total_price / 100)
                      }
                      if (discountValue) {
                        shippingLine.discount += discountValue
                        shippingLine.total_price -= discountValue
                        if (shippingLine.total_price < 0) {
                          shippingLine.total_price = 0
                        }
                      }
                      break
                    }
                  }
                }
              }

              if (typeof url === 'string') {
                // add WS URL to custom fields to facilitate debugging
                shippingLine.custom_fields = [{
                  field: 'correios_ws_params',
                  value: (nCdEmpresa ? url.replace(nCdEmpresa, 'c').replace(sDsSenha, 's') : url)
                    .replace(/[^?]+\?(.*)/, '$1')
                    .replace(/(StrRetorno|nIndicaCalculo|nCdFormato|nVlDiametro)=[^&]+&?/g, '')
                    .slice(0, 255)
                }]
              }

              // push shipping service object to response
              response.shipping_services.push({
                label,
                carrier: 'Correios',
                // https://informederendimentos.com/consulta/cnpj-correios/
                carrier_doc_number: '34028316000103',
                service_code: Codigo,
                service_name: serviceName || label,
                shipping_line: shippingLine
              })
            } else {
              errorMsg = `Correios erro ${Erro}`
              if (typeof MsgErro === 'string') {
                errorMsg += `: ${MsgErro}`
              }
              if (typeof url === 'string') {
                errorMsg += `\n${url}`
              }
            }
          })

          if (response.shipping_services.length) {
            // free shipping if all items has no weigth
            const freeNoWeightShipping = nVlPeso <= 0 && config.free_no_weight_shipping
            if (freeNoWeightShipping) {
              let cheapestShippingLine
              for (let i = 0; i < response.shipping_services.length; i++) {
                const shippingLine = response.shipping_services[i].shipping_line
                if (!shippingLine.total_price) {
                  // already free
                  break
                }
                if (!cheapestShippingLine || cheapestShippingLine.total_price > shippingLine.total_price) {
                  cheapestShippingLine = shippingLine
                }
              }
              if (cheapestShippingLine) {
                // set the cheapest shipping line free
                cheapestShippingLine.discount = cheapestShippingLine.total_price
                cheapestShippingLine.total_price = 0
                cheapestShippingLine.flags.push('free_no_weight')
              }
            }
          } else if (errorMsg) {
            // pass Correios error message
            return res.status(400).send({
              error: 'CALCULATE_ERR_MSG',
              message: errorMsg
            })
          }

          // success response with available shipping services
          return res.send(response)
        }

        // unexpected result object
        res.status(500).send({
          error: 'CALCULATE_UNEXPECTED_RSP',
          message: 'Unexpected object from Correios response, please try again later'
        })
      })
    } else {
      res.status(400).send({
        error: 'CALCULATE_EMPTY_CART',
        message: 'Cannot calculate shipping without cart items'
      })
    }
  }
}
