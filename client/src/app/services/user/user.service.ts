import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../../model/User';
import { AuthService } from '../firebase/auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl: string;

  constructor(
    private _http: HttpClient,
    private _authService: AuthService,
  ) {
    this.apiUrl = environment.apiUrl;
  }

  createUser(user: User, password: string): void {
    this._authService
      .createUserWithEmailAndPassword(user.email, password)
      .then((response) => {
        console.log(response);
      });
  }
}
