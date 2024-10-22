const admin = require('firebase-admin');
const serviceAccount = require('./service-account/javitech.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://javitech-8797d.appspot.com',
});

const usersApi = require('./apis/users');

module.exports = {
  ...usersApi,
};
