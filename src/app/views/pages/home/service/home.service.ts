import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient ) { }

  getFormationByUser(){
    const headers = new HttpHeaders();
    const params = new HttpParams();
    this.http.post('http://localhost:8080/login/register', {headers: headers, params: params}).subscribe(
      response => {
        console.log(response);
      }
    )
  }

}
