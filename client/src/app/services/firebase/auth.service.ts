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
    password: string
  ): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  signInWithEmailAndPassword(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password).then((response) => {
      console.log(response);
    });
  }
}
