'use strict'

// read configured E-Com Plus app data
const getConfig = require(process.cwd() + '/lib/store-api/get-config')
// add/remove Correios contracts on local database
const { save, remove } = require(process.cwd() + '/lib/store-api/get-config')

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
            return getConfig({ appSdk, storeId })
          } else {
            return trigger.body
          }
        })

        .then(config => {
          // check contract info
          if (config.correios_contract) {
            const zip = config.zip
            const code = config.correios_contract.code
            const password = config.correios_contract.password
            if (
              typeof zip === 'string' && zip &&
              typeof code === 'string' && code &&
              typeof password === 'string' && password
            ) {
              // concat service codes string
              let serviceCodes = ''
              if (Array.isArray(config.services) && config.services[0]) {
                serviceCodes = config.services[0].service_code
                for (let i = 1; i < config.services.length; i++) {
                  serviceCodes += `,${config.services[i].service}`
                }
              }
              // save new contract info
              return save(storeId, zip, code, password, serviceCodes)
            }
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
            // logger.error(err)
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
