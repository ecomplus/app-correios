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

module.exports = () => new Promise((resolve, reject) => {
  // restart
  noContractZipCodes = []

  // list all contracts info
  database.listContracts()

    .then(contracts => {
      // random sort
      contracts = contracts.sort((a, b) => 0.5 - Math.random())
      logger.log('[offline] Updating offline contracts:', contracts)

      ;(async function loop () {
        for (let i = 0; i < contracts.length; i++) {
          const { zip, code, password, serviceCodes } = contracts[i]
          // start calculating and saving results to Firestore for this sender
          let sCepOrigem = zip
          let senderParams

          if (!code || !password) {
            // no contract
            const zipRange = zipCodeRanges.find(zipCodeRange => {
              return zipCodeRange[0] <= zip && zipCodeRange[1] >= zip
            })
            if (zipRange) {
              sCepOrigem = zipRange[0]
              // check if this zip code was not performed yet
              if (noContractZipCodes.indexOf(sCepOrigem) === -1) {
                noContractZipCodes.push(sCepOrigem)
              } else {
                // skip
                return
              }
            } else {
              logger.error(new Error(`Cannot find mocked zip range for ${zip}`))
            }
            senderParams = { sCepOrigem }
          } else {
            senderParams = {
              nCdEmpresa: code,
              sDsSenha: password,
              nCdServico: serviceCodes,
              sCepOrigem
            }
          }

          // send all requests with current contract
          logger.log(`[offline] Starting update for ${sCepOrigem}`)
          await updateByContract(senderParams, i === 0).then(() => {
            logger.log(`[offline] Data updated for sender ${sCepOrigem}:`, senderParams)
          })
        }

        // all done
        resolve()
        logger.log('[offline] All contracts updated')
      }())
    })

    .catch(reject)
})
