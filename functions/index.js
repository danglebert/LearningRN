const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });
const fs = require('fs');
const UUID = require('uuid-v4');

const projId = 'learningrn-40203';
const bucketLoc = 'learningrn-40203.appspot.com';

const gcConfig = {
  projectId: projId,
  keyFilename: 'learning-RN.json'
};
const gcs = require('@google-cloud/storage')(gcConfig);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.storeImage = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    const body = JSON.parse(req.body);
    fs.writeFileSync('/tmp/uploaded-image.jpg', body.image, 'base64', err => {
      console.log(err);
      return res.status(500).json({ error: err });
    });

    const bucket = gcs.bucket(bucketLoc);
    const uniqueId = UUID();

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
          console.log(err);
          res.status(500).json({ error: err });
        }
      }
    );
  });
});

// exports.storeImage = functions.https.onRequest((request, response) => {
//   return cors(request, response, () => {
//     const body = JSON.parse(request.body);
//     fs.writeFileSync('/tmp/uploaded-image.jpg', body.image, 'base64', err => {
//       console.log(err);
//       return response.status(500).json({ error: err });
//     });
//     const bucket = gcs.bucket(projId + '.appspot.com');
//     const uuid = UUID();

//     return bucket.upload(
//       '/tmp/uploaded-image.jpg',
//       {
//         uploadType: 'media',
//         destination: '/places/' + uuid + '.jpg',
//         metadata: {
//           metadata: {
//             contentType: 'image/jpeg',
//             firebaseStorageDownloadTokens: uuid
//           }
//         }
//       },
//       (err, file) => {
//         if (!err) {
//           return response.status(201).json({
//             imageUrl:
//               'https://firebasestorage.googleapis.com/v0/b/' +
//               bucket.name +
//               '/o/' +
//               encodeURIComponent(file.name) +
//               '?alt=media&token=' +
//               uuid
//           });
//         } else {
//           console.log(err);
//           return response.status(500).json({ error: err });
//         }
//       }
//     );
//   });
// });
