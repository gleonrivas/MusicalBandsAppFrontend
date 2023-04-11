import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  loginMethod(body: any){
    const headers = new HttpHeaders();
    const params = new HttpParams();
    return this.http.post('http://localhost:8080/login/auth', body, {headers: headers, params: params})
  }
}
