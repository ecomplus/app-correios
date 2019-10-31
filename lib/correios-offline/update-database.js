'use strict'

// log on files
const logger = require('console-files')
// list contracts from database
const database = require('./../database')
// handle each update queue by sender contract
const updateByContract = require('./update-by-contract')
// list of CEPs to calculate
const zipCodeRanges = require('./../../assets/correios-offline/zip-code-ranges.json')

// save zip codes already handled without contract
// prevent unecessary "duplicated" requests
let noContractZipCodes = []

const nextContract = (offset = 0) => new Promise((resolve, reject) => {
  let retry = 0
  const callNextContract = (addOffset = 0) => {
    // recursive call
    nextContract(offset + addOffset).then(resolve).catch(reject)
  }

  // get contract info one by one from local database first
  database.get(offset)

    .then(row => {
      if (row.zip) {
        // start calculating and saving results to Firestore for this sender
        let sCepOrigem
        if (!row.code || row.password) {
          // no contract
          sCepOrigem = zipCodeRanges.find(zipCodeRange => {
            return zipCodeRange[0] <= row.zip && zipCodeRange[1] >= row.zip
          })
          if (sCepOrigem) {
            sCepOrigem = sCepOrigem[0]
            // check if this zip code was not performed yet
            if (noContractZipCodes.indexOf(sCepOrigem) === -1) {
              noContractZipCodes.push(sCepOrigem)
            } else {
              // skip
              return callNextContract(1)
            }
          } else {
            logger.error(new Error(`Cannot find mocked zip range for ${row.zip}`))
            sCepOrigem = row.zip
          }
        }

        updateByContract({
          nCdEmpresa: row.code,
          sDsSenha: row.password,
          nCdServico: row.service_codes,
          sCepOrigem
        }).then(() => {
          // recursive call
          callNextContract(1)
        })
      } else {
        // all done
        resolve()
      }
    })

    .catch(err => {
      retry++
      if (retry < 3) {
        // delay and try again
        setTimeout(callNextContract, 10000)
      } else {
        logger.error(new Error(`Cannot get contract from database with offset ${offset}`))
        reject(err)
      }
    })
})

module.exports = () => {
  // restart
  noContractZipCodes = []
  nextContract()
}
