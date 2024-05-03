import {
  Auth,
  UserCredential,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import app from './firebase.service';

export class AuthService {
  private auth: Auth;

  constructor() {
    this.auth = getAuth(app);
  }

  createUserWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  signInWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
}
