const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
const fs = require('fs');
const UUID = require('uuid-v4');
const learningRn = require('./learning-RN.json');

const projId = 'learningrn-40203';
const bucketLoc = 'learningrn-40203.appspot.com';

const gcConfig = {
  projectId: projId,
  keyFilename: 'learning-RN.json'
};
const gcs = require('@google-cloud/storage')(gcConfig);

admin.initializeApp({
  credential: admin.credential.cert(require('./learning-RN.json'))
});

exports.storeImage = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    if (
      !request.headers.authorization ||
      !request.headers.authorization.startsWith('Bearer ')
    ) {
      console.log('No token present');
      res.status(403).json({ error: 'Unauthorized' });
      return;
    }

    let idToken;
    idToken = request.headers.authorization.split('Bearer ')[1];
    console.log('idToken in FUNCTIONS: ', idToken);

    admin
      .auth()
      .verifyIdToken(idToken)
      .then(decodedToken => {
        const body = JSON.parse(req.body);
        fs.writeFileSync(
          '/tmp/uploaded-image.jpg',
          body.image,
          'base64',
          err => {
            console.log(err);
            return res.status(500).json({ error: err });
          }
        );

        const bucket = gcs.bucket(bucketLoc);
        const uniqueId = UUID();

        // eslint-disable-next-line consistent-return
        return bucket.upload(
          '/tmp/uploaded-image.jpg',
          {
            uploadType: 'media',
            destination: `/places/${uniqueId}.jpg`,
            metadata: {
              metadata: {
                contentType: 'image/jpeg',
                firebaseStorageDownloadTokens: uniqueId
              }
            }
          },
          (err, file) => {
            if (!err) {
              res.status(201).json({
                imageUrl:
                  'https://firebasestorage.googleapis.com/v0/b/' +
                  bucket.name +
                  '/o/' +
                  encodeURIComponent(file.name) +
                  '?alt=media&token=' +
                  uniqueId
              });
            } else {
              console.log('error in cloud func: ', err);
              res.status(500).json({ error: err });
            }
          }
        );
      })
      .catch(error => {
        console.log('Token invalid');
        res.status(403).json({ error: 'Unauthorized' });
      });
  });
});
