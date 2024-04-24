const admin = require('firebase-admin');
const serviceAccount = require('./service-account/javitech.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://alegriatech-2bf22.appspot.com',
});

const usersApi = require('./apis/users');

module.exports = {
  ...usersApi,
};
