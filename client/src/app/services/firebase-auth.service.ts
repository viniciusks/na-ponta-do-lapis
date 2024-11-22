import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { app } from './firebase.service';

const auth = getAuth(app);

export { auth, createUserWithEmailAndPassword };
