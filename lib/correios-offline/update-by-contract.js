'use strict'

// log on files
const logger = require('console-files')
// list of CEPs to calculate
let zipCodeRanges = require('./../../assets/correios-offline/zip-code-ranges.json')
// calculate freight from Correios WS
const calculate = require('./../correios-ws/calculate')
// Firestore admin client
const { insert } = require('./client')

// delay promise
const delay = (time = 1200) => new Promise(resolve => setTimeout(resolve, time))

module.exports = (senderParams, isDebug) => new Promise(resolve => {
  // shuffle zip code ranges list
  zipCodeRanges = zipCodeRanges.sort(() => Math.random() - Math.random())

  // caculate for each zip code as recipient
  const nextZipCode = async (index = 0, nVlPeso = 0.5) => {
    // count failed zip codes
    let countErrors = 0
    if (index < zipCodeRanges.length) {
      // sender info to save
      const { sCepOrigem, nCdEmpresa } = senderParams
      const sCepDestino = zipCodeRanges[index][0]

      // also calculate for different package weigths
      while (nVlPeso <= 50) {
        await delay()
        const params = Object.assign({ sCepDestino, nVlPeso }, senderParams)
        if (isDebug === true) {
          logger.log('[offline] Calculate params:', params)
        }
        let retry = 0
        let result

        try {
          result = await calculate(params, 30000, isDebug)
        } catch (e) {
          retry++
          if (retry < 2) {
            if (isDebug === true) {
              logger.log('[offline] Calculate retry')
            }
            // delay and try again
            await delay(500)
            return nextZipCode(index, nVlPeso)
          } else {
            countErrors++
            logger.error(`Cannot calculate with zip code ${sCepDestino} and weigth ${nVlPeso}`)
            if (countErrors >= 5 && index <= 7) {
              // stop trying
              logger.error(`Update for contract '${nCdEmpresa}' failed`)
              return resolve()
            }
          }
        }
        if (isDebug === true) {
          logger.log(`[offline] Calculate ${(result ? 'OK' : 'failed')}`)
        }

        if (result) {
          const services = Array.isArray(result.Servicos)
            ? result.Servicos
            : Array.isArray(result.Servicos.cServico)
              ? result.Servicos.cServico : [result.Servicos.cServico]

          if (services[0] && services[0].Codigo) {
            if (isDebug === true) {
              logger.log('[offline] Calculate success')
            }
            for (let i = 0; i < services.length; i++) {
              if (!services[i]) {
                break
              }
              let { Codigo, Valor, PrazoEntrega, Erro, MsgErro } = services[i]

              if (typeof MsgErro !== 'string') {
                // prevent saving empty object
                MsgErro = ''
              }
              if (Erro && parseInt(Erro, 10) !== 0) {
                if (Erro === '-2') {
                  // "CEP de origem invalido."
                  if (!nCdEmpresa) {
                    const err = new Error(`Invalid default zip code ${sCepOrigem} - ${sCepDestino}`)
                    err.result = JSON.stringify(result)
                    logger.error(err)
                  }
                }
                countErrors++
                if (countErrors >= 10) {
                  // continue to next zip code
                  index++
                  return nextZipCode(index)
                }
                continue
              }
              countErrors = 0

              // save to Correios offline storage
              if (isDebug === true) {
                logger.log(`[offline] Insert ${sCepOrigem} - ${sCepDestino}`)
              }
              try {
                await insert({
                  Codigo,
                  Valor,
                  PrazoEntrega,
                  Erro,
                  MsgErro,
                  sCepOrigem,
                  sCepDestino,
                  nVlPeso,
                  nCdEmpresa: nCdEmpresa || ''
                })
              } catch (e) {
                // ignore
              }
            }
          } else {
            // unexpected result object
            logger.log('[offline] Debug Correios calculate result object:')
            logger.log(JSON.stringify(result, null, 2))
            return resolve()
          }
        }

        // next weigth
        if (nVlPeso < 50) {
          nVlPeso = nVlPeso < 0.5 ? 0.65
            : nVlPeso < 1 ? 1
              : nVlPeso >= 40 ? 50
                : nVlPeso + Math.ceil(nVlPeso / 10)
        } else {
          break
        }
      }

      // continue to next zip code
      index++
      nextZipCode(index)
    } else {
      // all done
      resolve()
    }
  }
  nextZipCode()
})
