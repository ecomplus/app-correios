'use strict'

// log on files
const logger = require('console-files')

module.exports = appSdk => {
  return (req, res) => {
    const { storeId } = req
    // handle callback with E-Com Plus app SDK
    // https://github.com/ecomplus/application-sdk
    appSdk.handleCallback(storeId, req.body)

      .then(() => {
        // authentication tokens were updated
        res.status(204)
        res.end()
      })

      .catch(err => {
        if (typeof err.code === 'string' && !err.code.startsWith('SQLITE_CONSTRAINT')) {
          // debug SQLite errors
          logger.error(err)
        }
        res.status(500)
        const { message } = err
        res.send({
          error: 'auth_callback_error',
          message
        })
      })
  }
}
