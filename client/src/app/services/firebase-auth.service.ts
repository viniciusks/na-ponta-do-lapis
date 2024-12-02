import {
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
} from 'firebase/auth';
import { app } from './firebase.service';
import { environment } from '../../environments/environment';

const auth = getAuth(app);

if (!environment.isProd) {
  connectAuthEmulator(auth, 'http://127.0.0.1:9099');
}

export { auth, createUserWithEmailAndPassword, deleteUser };
