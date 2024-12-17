import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AssetsService {
  apiFunction: string;

  constructor(private _http: HttpClient) {
    this.apiFunction = environment.apiFunction;
  }

  getAssets() {
    return this._http.get(`${this.apiFunction}/assets`);
  }

  getAsset(assetId: string) {
    return this._http.get(`${this.apiFunction}/assets/${assetId}`);
  }

  createAsset(asset: any) {
    let params = JSON.stringify(asset);
    let headers = {
      'Content-Type': 'application/json',
    };

    return this._http.post(`${this.apiFunction}/assets`, params, {
      headers: headers,
    });
  }

  updateAsset(asset: any) {
    let params = JSON.stringify(asset);
    let headers = {
      'Content-Type': 'application/json',
    };

    return this._http.put(
      `${this.apiFunction}/assets/${asset.assetId}`,
      params,
      {
        headers: headers,
      },
    );
  }

  deleteAsset(assetId: string) {
    return this._http.delete(`${this.apiFunction}/assets/${assetId}`);
  }
}
