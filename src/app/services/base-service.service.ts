import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  private _apiUrl = environment.apiEndpoint;

  constructor(private _http: HttpClient) { }

  get() {
    return this._http.get<any>(this._apiUrl);
  }

  getById(id) {
    return this._http.get<any>(this._apiUrl + id);
  }

  add(data) {
    return this._http.post<any>(this._apiUrl, data);
  }

  deleteProgram(id) {
    return this._http.delete<any>(this._apiUrl + id);
  }

  update(data, id) {
    return this._http.put<any>(this._apiUrl + id, data);
  }

}
