'use strict'

// log on files
const logger = require('console-files')
// read configured E-Com Plus app data
const getConfig = require(process.cwd() + '/lib/store-api/get-config')
// add/remove Correios contracts on local database
const { save, remove } = require(process.cwd() + '/lib/database')

const SKIP_TRIGGER_NAME = 'SkipTrigger'
const ECHO_SUCCESS = 'SUCCESS'
const ECHO_SKIP = 'SKIP'
const ECHO_DB_ERROR = 'LOCAL_DATABASE_ERR'

module.exports = appSdk => {
  return (req, res) => {
    const { storeId } = req
    // treat E-Com Plus trigger body here
    // https://developers.e-com.plus/docs/api/#/store/triggers/
    const trigger = req.body

    // check if Correios contract were edited
    if (trigger.body && (trigger.body.correios_contract || trigger.body.zip || trigger.body.services)) {
      // remove old Correios contract by Store ID first
      remove(storeId)

        .then(() => {
          if (!trigger.body.correios_contract || !trigger.body.zip || !trigger.body.services) {
            // get app configured options
            return getConfig({ appSdk, storeId }, true)
          } else {
            return trigger.body
          }
        })

        .then(config => {
          // check contract info
          const zip = typeof config.zip === 'string' && config.zip.replace(/\D/g, '')
          if (zip) {
            let code = ''
            let password = ''
            let serviceCodes = ''
            if (config.correios_contract) {
              if (typeof config.correios_contract.code === 'string') {
                code = config.correios_contract.code.trim()
              }
              if (typeof config.correios_contract.password === 'string') {
                password = config.correios_contract.password.trim()
              }

              // concat service codes string
              if (Array.isArray(config.services) && config.services[0]) {
                serviceCodes = config.services[0].service_code
                if (config.services.length > 1) {
                  serviceCodes += `,${config.services[1].service_code}`
                }
              }
            }

            // save new contract info
            return save(storeId, zip, code, password, serviceCodes)
          }

          // don't have contract to save
          const err = new Error()
          err.name = SKIP_TRIGGER_NAME
          throw err
        })

        .then(() => {
          // Contract saved / skipped
          res.send(ECHO_SUCCESS)
        })

        .catch(err => {
          if (err.name === SKIP_TRIGGER_NAME) {
            // trigger ignored by app configuration
            res.send(ECHO_SKIP)
          } else {
            logger.error(err)
            // request to Store API with error response
            // return error status code
            res.status(500)
            const { message } = err
            res.send({
              error: ECHO_DB_ERROR,
              message
            })
          }
        })
    } else {
      // nothing to do
      res.send(ECHO_SKIP)
    }
  }
}
