import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class CategoryService {
  apiFunction: string;

  constructor(private _http: HttpClient) {
    this.apiFunction = environment.apiFunction;
  }

  getCategories() {
    return this._http.get(`${this.apiFunction}/categories`);
  }

  getCategory(categoryId: string) {
    return this._http.get(`${this.apiFunction}/categories/${categoryId}`);
  }

  createCategory(category: any) {
    let params = JSON.stringify(category);
    let headers = {
      'Content-Type': 'application/json',
    };

    return this._http.post(`${this.apiFunction}/categories`, params, {
      headers: headers,
    });
  }

  updateCategory(category: any) {
    let params = JSON.stringify(category);
    let headers = {
      'Content-Type': 'application/json',
    };

    return this._http.put(
      `${this.apiFunction}/categories/${category.categoryId}`,
      params,
      {
        headers: headers,
      },
    );
  }

  deleteCategory(categoryId: string) {
    return this._http.delete(`${this.apiFunction}/categories/${categoryId}`);
  }
}
