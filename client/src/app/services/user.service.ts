import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {
  apiFunction: string;

  constructor(private _http: HttpClient) {
    this.apiFunction = environment.apiFunction;
  }

  getIdentity() {}

  getUsers() {
    return this._http.get(`${this.apiFunction}/users`);
  }

  getUser(uid: string) {
    return this._http.get(`${this.apiFunction}/users/${uid}`);
  }

  createUser(user: any) {
    let params = JSON.stringify(user);
    let headers = {
      'Content-Type': 'application/json',
    };

    return this._http.post(`${this.apiFunction}/users`, params, {
      headers: headers,
    });
  }

  updateUser(user: any) {
    let params = JSON.stringify(user);
    let headers = {
      'Content-Type': 'application/json',
    };

    return this._http.put(`${this.apiFunction}/users/${user.uid}`, params, {
      headers: headers,
    });
  }

  deleteUser(uid: string) {
    return this._http.delete(`${this.apiFunction}/users/${uid}`);
  }
}
