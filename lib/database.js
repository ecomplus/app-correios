'use strict'

// SQLite3 database client
// https://github.com/mapbox/node-sqlite3
const sqlite = require('sqlite3').verbose()
// log to files
const logger = require('console-files')

// setup table to reference Correios contract to respective store
const dbFilename = process.env.DB_PATH || process.env.ECOM_AUTH_DB || './db.sqlite'
const dbTable = 'store_correios_contract'

const db = new sqlite.Database(dbFilename, err => {
  const error = err => {
    // debug and destroy Node process
    logger.error(err)
    process.exit(1)
  }

  if (err) {
    error(err)
  } else {
    // try to run first query creating table
    db.run(`CREATE TABLE IF NOT EXISTS ${dbTable} (
      store_id           INTEGER   NOT NULL  PRIMARY KEY,
      zip                VARCHAR   NOT NULL,
      code               VARCHAR   NOT NULL,
      password           VARCHAR   NOT NULL,
      service_codes      VARCHAR
    );`, err => {
      if (err) {
        error(err)
      }
    })
  }
})

// abstracting DB statements with promise
const dbRunPromise = (sql, params) => new Promise((resolve, reject) => {
  db.run(sql, params, err => {
    if (err) {
      logger.error(err)
      reject(err)
    } else {
      // query executed with success
      resolve()
    }
  })
})

module.exports = {
  save (storeId, zip, code, password, serviceCodes) {
    // insert a new row
    const sql = `INSERT INTO ${dbTable}` +
      ' (store_id, zip, code, password, service_codes)' +
      ' VALUES (?, ?, ?, ?, ?)'
    return dbRunPromise(sql, [storeId, zip, code, password, serviceCodes])
  },

  remove (storeId) {
    // delete a row
    const sql = `DELETE FROM ${dbTable} WHERE store_id = ?`
    return dbRunPromise(sql, [storeId])
  },

  get (offset = 0) {
    // get contracts one by one with pagination
    const sql = `SELECT * FROM ${dbTable} LIMIT 1 OFFSET ${offset}`
    return new Promise((resolve, reject) => {
      db.each(sql, (err, row) => {
        if (err) {
          logger.error(err)
          reject(err)
        } else if (row) {
          // found with success
          // resolve the promise returning respective store and contract info
          resolve({
            storeId: row.store_id,
            zip: row.zip,
            code: row.code,
            password: row.password,
            serviceCodes: row.service_codes
          })
        } else {
          resolve({})
        }
      })
    })
  }
}
