'use strict'

// log on files
const logger = require('console-files')
// handle Correios offline storage with Google Firestore
// https://github.com/firebase/firebase-admin-node
const admin = require('firebase-admin')

// Firebase account config
const { FIREBASE_KEY_PATH, FIREBASE_PROJECT, FIRESTORE_COLLECTION } = process.env
const keyPath = FIREBASE_KEY_PATH || './../../assets/firebase/serviceAccountKey.json'
const serviceAccount = require(keyPath)
const project = FIREBASE_PROJECT || 'ecomplus-correios-db'
const collection = FIRESTORE_COLLECTION || 'calculos'

// setup client
const databaseURL = `https://${project}.firebaseio.com`
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL
})
logger.log(`Setup Firebase app with URL ${databaseURL}`)
const firestore = admin.firestore()
const collectionRef = firestore.collection(collection)

module.exports = {
  insert (body) {
    // add entry to Firestore database
    collectionRef
      .add({
        ...body,
        timestamp: admin.firestore.Timestamp.fromDate(new Date())
      })
      .catch(err => logger.error(err))
  },

  deleteBeforeDate (date) {
    // deletes all entries with timestamp before date param
    collectionRef
      .where('timestamp', '<', admin.firestore.Timestamp.fromDate(date))
      .get()
      .then(querySnapshot => {
        querySnapshot
          .forEach(documentSnapshot => {
            // try to delete current document
            const { path } = documentSnapshot.ref
            collectionRef
              .doc(path)
              .delete()
              .catch(err => logger.error(err))
              .then(() => logger.log(`[offline] Deleted document ${path}`))
          })
      })
      .catch(err => logger.error(err))
  },

  list (body) {
    // get one document by body properties
    let query = collectionRef
    for (const param in body) {
      if (body[param]) {
        query = query.where(param, '==', body[param])
      }
    }
    query.orderBy('timestamp', 'desc')
    return new Promise((resolve, reject) => {
      const results = []
      query.get()
        .then(querySnapshot => {
          querySnapshot.forEach(documentSnapshot => {
            // push document data object to results list
            results.push(documentSnapshot.data())
          })
          resolve(results)
        })
        .catch(reject)
    })
  }
}
