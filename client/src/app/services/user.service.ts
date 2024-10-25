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

  register(user: any) {
    let params = JSON.stringify(user);
    let headers = {
      'Content-Type': 'application/json',
    };

    return this._http.post(`${this.apiFunction}/users`, params, {
      headers: headers,
    });
  }
}
