#!/usr/bin/env node

'use strict'

// log on files
const logger = require('console-files')
// handle app authentication to Store API
// https://github.com/ecomplus/application-sdk
const { ecomAuth } = require('@ecomplus/application-sdk')

logger.log('--> Start running daemon processes')

ecomAuth.then(appSdk => {
  // configure setup for stores
  // list of procedures to save
  const procedures = require('./../lib/store-api/procedures')
  if (procedures && procedures.length) {
    appSdk.configureSetup(procedures, (err, { storeId }) => {
      if (!err) {
        logger.log('--> Setup store #' + storeId)
      } else if (!err.appAuthRemoved) {
        logger.error(err)
      }
    })
  }
})

ecomAuth.catch(err => {
  logger.error(err)
  setTimeout(() => {
    // destroy Node process while Store API auth cannot be handled
    process.exit(1)
  }, 1000)
})

// intervals to update Correios offline database (Firestore)
const updateCorreiosOfflineDatabase = require('./../lib/correios-offline/update-database')
const correiosOfflineClient = require('./../lib/correios-offline/client')

const correiosOfflineTask = () => {
  setTimeout(() => {
    updateCorreiosOfflineDatabase().finally(() => {
      logger.log('End Correios Offline database update')
      correiosOfflineTask()
    })
    logger.log('Update Correios Offline started')
    // clear documents older than 120 days ago
    const date = new Date()
    date.setDate(date.getDate() - 120)
    correiosOfflineClient.deleteBeforeDate(date)
    logger.log(`Clearing offline data before date ${date.toISOString()}`)
  }, 1000 * 60 * 10)
}
correiosOfflineTask()
