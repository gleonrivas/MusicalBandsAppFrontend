import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  registerMethod(body: any){
    const headers = new HttpHeaders();
    const params = new HttpParams();
    this.http.post('http://localhost:8080/login/register', body, {headers: headers, params: params}).subscribe(
      response => {
        console.log(response);
      }
    )
  }
}
