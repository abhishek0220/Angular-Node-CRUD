import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators'
import {HttpClient, HttpHeaders, HttpHeaderResponse, HttpErrorResponse} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUri:string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type','application/json');
  constructor(private http: HttpClient) { }

  createEmployee(data) :Observable<any>{
    console.log(data);
    let url = `${this.baseUri}/create`;
    return this.http.post(url, data)
  }
  getEmployees() {
    return this.http.get(`${this.baseUri}`);
  }
}
