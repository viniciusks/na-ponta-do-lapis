import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Category } from '../models/category';

@Injectable()
export class CategoryService {
  apiFunction: string;

  constructor(private _http: HttpClient) {
    this.apiFunction = environment.apiFunction;
  }

  getCategories() {
    return this._http.get(`${this.apiFunction}/categories`);
  }

  getCategory(categoryUid: string) {
    return this._http.get(`${this.apiFunction}/categories/${categoryUid}`);
  }

  createCategory(category: Category) {
    let params = JSON.stringify(category);
    let headers = {
      'Content-Type': 'application/json',
    };

    return this._http.post(`${this.apiFunction}/categories`, params, {
      headers: headers,
    });
  }

  updateCategory(category: Category) {
    let params = JSON.stringify(category);
    let headers = {
      'Content-Type': 'application/json',
    };

    return this._http.put(
      `${this.apiFunction}/categories/${category.uid}`,
      params,
      {
        headers: headers,
      },
    );
  }

  deleteCategory(categoryUid: string) {
    return this._http.delete(`${this.apiFunction}/categories/${categoryUid}`);
  }
}
