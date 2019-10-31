'use strict'

// log on files
const logger = require('console-files')
// list of CEPs to calculate
const zipCodes = require('./../../assets/correios-offline/zip-codes.json')
// calculate freight from Correios WS
const calculate = require('./../correios-ws/calculate')
// Firestore admin client
const { insert } = require('./client')

// delay promise
const delay = (time = 1000) => new Promise(resolve => setTimeout(resolve, time))

module.exports = senderParams => new Promise(resolve => {
  // count failed zip codes
  let countErrors = 0

  // caculate for each zip code as recipient
  const nextZipCode = async (index = 0, nVlPeso = 0.3) => {
    if (index < zipCodes.length) {
      // also calculate for different package weigths
      while (nVlPeso <= 50) {
        await delay()
        const sCepDestino = zipCodes[index]
        const params = Object.assign({ sCepDestino, nVlPeso }, senderParams)
        let retry = 0
        let result

        try {
          result = await calculate(params)
        } catch (e) {
          retry++
          if (retry < 2) {
            // delay and try again
            delay(500)
            return nextZipCode(index, nVlPeso)
          } else {
            countErrors++
            logger.error(`Cannot calculate with zip code ${sCepDestino} and weigth ${nVlPeso}`)
            if (countErrors === 5 && index <= 7) {
              // stop trying
              logger.error(`Update for contract '${params.nCdEmpresa}' failed`)
              return resolve()
            }
          }
        }

        if (result) {
          const services = Array.isArray(result.Servicos)
            ? result.Servicos
            : Array.isArray(result.Servicos.cServico)
              ? result.Servicos.cServico : [result.Servicos.cServico]
          if (services[0] && services[0].Codigo) {
            services.forEach(({ Codigo, Valor, PrazoEntrega, Erro, MsgErro }) => {
              if (!Erro || Erro === '0' || MsgErro) {
                // save to Correios offline storage
                insert({
                  Codigo,
                  Valor,
                  PrazoEntrega,
                  Erro,
                  MsgErro,
                  ...params
                })
              }
            })
          } else {
            // unexpected result object
            logger.log('Debug Correios calculate result object:')
            logger.log(JSON.stringify(result, null, 2))
            resolve()
          }
        }

        // next weigth
        nVlPeso = nVlPeso < 0.5 ? 0.65
          : nVlPeso < 1 ? 1
            : nVlPeso === 46 ? 50
              : nVlPeso + Math.ceil(nVlPeso / 10)
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
