'use strict'

// log on files
const logger = require('console-files')
// use axios promise based HTTP client
// https://github.com/axios/axios
const axios = require('axios')
// parse XML Correios response to JSON
// https://github.com/buglabs/node-xml2json#readme
const xml2json = require('xml2json')

const roundDecimal = num => Math.round(num * 100) / 100

// https://www.correios.com.br/precos-e-prazos/calculador-remoto-de-precos-e-prazos
const baseUrl = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?StrRetorno=xml'

const sendCalculateRequest = (params, timeout) => {
  // complete WS URL
  let url = baseUrl
  for (const param in params) {
    if (params[param] !== undefined) {
      url += `&${param}=${params[param]}`
    }
  }

  // returns axios request promise
  return axios({
    method: 'get',
    url,
    timeout,
    responseType: 'text'
  }).then(({ data }) => {
    // parse XML to object
    return {
      ...xml2json.toJson(data, {
        object: true
      }),
      url
    }
  }).catch(err => {
    if (err.code !== 'ECONNRESET') {
      // debug unknown error
      logger.error(err)
    }
    throw err
  })
}

module.exports = (params = {}, timeout) => {
  // set some default params
  params.nIndicaCalculo = 3
  params.nCdFormato = 1
  params.nVlDiametro = 0
  if (!params.nCdServico) {
    // PAC, SEDEX
    params.nCdServico = '04510,04014'
  }
  // check minimum package dimensions
  if (!(params.nVlPeso >= 0.1)) {
    params.nVlPeso = 0.1
  } else {
    params.nVlPeso = roundDecimal(params.nVlPeso)
  }
  if (!(params.nVlComprimento >= 16)) {
    params.nVlComprimento = 16
  }
  if (!(params.nVlAltura >= 2)) {
    params.nVlAltura = 2
  }
  if (!(params.nVlLargura >= 11)) {
    params.nVlLargura = 11
  }

  // optional additional services
  ;['sCdMaoPropria', 'sCdAvisoRecebimento'].forEach(param => {
    if (!params[param]) {
      params[param] = 'n'
    }
  })
  if (params.nVlValorDeclarado === undefined) {
    params.nVlValorDeclarado = 0
  } else if (params.nVlValorDeclarado < 19.5) {
    params.nVlValorDeclarado = 19.5
  } else if (params.nVlValorDeclarado > 10000) {
    params.nVlValorDeclarado = 10000
  } else {
    params.nVlValorDeclarado = roundDecimal(params.nVlValorDeclarado)
  }

  // request promises array
  const promises = []
  if (!params.nCdEmpresa || !params.sDsSenha) {
    // Correios limit up to 1 service code per request
    params.nCdServico.split(',').forEach(nCdServico => {
      if (nCdServico) {
        promises.push(sendCalculateRequest({ ...params, nCdServico }))
      }
    })
  } else {
    // can send multiple service codes
    // always only one request
    promises.push(sendCalculateRequest(params))
  }

  /* simulate Correios offline
  promises.push(new Promise(resolve => {
    setTimeout(resolve, 15000)
  }))
  */

  // wait all request promises
  return Promise.all(promises).then(results => {
    if (results.length === 1) {
      // single request with multiple services
      const { Servicos, url } = results[0]
      const { cServico } = Servicos
      return {
        Servicos: {
          // add url to response
          cServico: (Array.isArray(cServico) ? cServico : [cServico])
            .map(cServico => ({ ...cServico, url }))
        }
      }
    } else {
      // merge promises results
      return {
        Servicos: {
          cServico: results.map(({ Servicos, url }) => {
            return { ...Servicos.cServico, url }
          })
        }
      }
    }
  })
}
