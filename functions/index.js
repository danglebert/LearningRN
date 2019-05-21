const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });
const fs = require('fs');
const UUID = require('uuid-v4');
const { projId, bucketLoc } = require('../secrets');

const gcConfig = {
  projectId: projId,
  keyFilename: 'learning-RN.json'
};
const gcs = require('@google-cloud/storage')(gcConfig);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.storeImage = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const body = JSON.parse(req.body);
    fs.writeFileSync('/tmp/uploaded-image-jpg', body.image, 'base64', err => {
      console.log(err);
      return res.status(500).json({ error: err });
    });

    const bucket = gcs.bucket(bucketLoc);
    const uniqueId = UUID();

    bucket.upload('/tmp/uploaded-image-jpg', {
      uploadType: 'media',
      destination: `/places/${uniqueId}.jpg`,
      metaData: {
        contentType: 'image/jpeg',
        firebaseStorageDownloadTokens: uniqueId
      }
    });
  });
});
