'use strict'

// log on files
const logger = require('console-files')
// use axios promise based HTTP client
// https://github.com/axios/axios
const axios = require('axios')
// parse XML Correios response to JSON
// https://github.com/buglabs/node-xml2json#readme
const xml2json = require('xml2json')

module.exports = (params = {}) => {
  // https://www.correios.com.br/precos-e-prazos/calculador-remoto-de-precos-e-prazos
  let url = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?StrRetorno=xml'

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
  }

  // complete WS URL
  for (const param in params) {
    if (params[param] !== undefined) {
      url += `&${param}=${params[param]}`
    }
  }

  // returns axios request promise
  return axios({
    method: 'get',
    url,
    responseType: 'text'
  }).then(xmlText => {
    // parse XML to object
    return xml2json.toJson(xmlText, {
      object: true
    })
  }).catch(err => {
    logger.error(err)
    throw err
  })
}
