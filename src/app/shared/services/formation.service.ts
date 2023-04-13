import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  constructor(private http: HttpClient ) { }

  getUserFormations(){
    const headers = new HttpHeaders();
    const params = new HttpParams();
    return this.http.post('http://localhost:8080/formation/listByUser', {headers: headers, params: params})
  }

}
