'use strict'

// get contracts from database
const database = require('./../database')
// list of CEPs to calculate
const zipCodes = require('./../../assets/correios-offline/zip-codes.json')
// calculate freight from Correios WS
const calculate = require('./../correios-ws/calculate')

const nextContract = (offset = 0) => {
  database.get(offset).then(row => {
  })
}
