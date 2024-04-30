import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../../model/User';
import { AuthService } from '../firebase/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl: string;

  constructor(private _authService: AuthService) {
    this.apiUrl = environment.apiUrl;
  }

  createUser(user: User, password: string) {
    this._authService
      .createUserWithEmailAndPassword(user.email, password)
      .then((response) => {
        console.log(response);
      });
  }
}
