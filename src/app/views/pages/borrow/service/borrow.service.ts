import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class BorrowService {

  constructor(private http: HttpClient) { }
  sendNewMaterial(body: any){
    const token: string | null = localStorage.getItem('Authorization')
    const headers = new HttpHeaders({'Authorization': token!})
    const params = new HttpParams();
    try {
      this.http.post('http://localhost:8080/material/create', body, {headers: headers, params: params}).subscribe(
        response => {
          console.log(response);
          alert('Hecho');
        }
      )
    }
    catch (error) {
      alert('Ha habido un error: ' + error);
    }
  }
}
