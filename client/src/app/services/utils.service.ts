import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class UtilsService {
  apiIbge: String;

  constructor(private _http: HttpClient) {
    this.apiIbge = environment.apiIbge;
  }

  getStates() {
    return this._http.get(`${this.apiIbge}/localidades/estados`);
  }

  getCities(state: string) {
    return this._http.get(
      `${this.apiIbge}/localidades/estados/${state}/municipios`,
    );
  }

  getCountries() {
    return this._http.get(`${this.apiIbge}/localidades/paises`);
  }
}
