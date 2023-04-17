import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class SquadCreateService {

  constructor(private http: HttpClient) { }
  sendNewSquad(body: any){
    const headers = new HttpHeaders('Access-Control-Allow-Origin: *');
    const params = new HttpParams();
    this.http.post('http://localhost:8080/formation/create', body, {headers: headers, params: params}).subscribe(
      response => {
        console.log(response);
      })
  }
}
