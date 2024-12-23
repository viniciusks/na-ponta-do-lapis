const admin = require('firebase-admin');
const serviceAccount = require('./service-account/javitech.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://javitech-8797d.appspot.com',
});

const usersApi = require('./apis/users');
const assetsApi = require('./apis/assets');
const categoriesApi = require('./apis/categories');

module.exports = {
  ...usersApi,
  ...assetsApi,
  ...categoriesApi,
};
