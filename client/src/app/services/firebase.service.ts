// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyAR5njPmvamcpJeifHejLKe2DSIGpzkdC8',
  authDomain: 'javitech-8797d.firebaseapp.com',
  projectId: 'javitech-8797d',
  storageBucket: 'javitech-8797d.appspot.com',
  messagingSenderId: '299299035763',
  appId: '1:299299035763:web:d7524884f2b9c1e0836806',
  measurementId: 'G-P0JJHK1V5K',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
