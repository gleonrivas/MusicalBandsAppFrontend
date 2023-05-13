import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class BorrowService {

  constructor(private http: HttpClient) { }
  sendNewMaterial(body: any): Promise<any>{
    const token: string | null = localStorage.getItem('Authorization')
    const headers = new HttpHeaders({'Authorization': token!})
    const params = new HttpParams();
    return new Promise((resolve, reject) => {
      try {
        this.http.post('http://localhost:8080/material/create', body, { headers: headers, params: params }).subscribe(
          response => {
            console.log(response);
            resolve(response); // Resuelve la promesa con la respuesta del servidor
          },
          error => {
            reject(error); // Rechaza la promesa con el error
          }
        );
      } catch (error) {
        reject(error); // Rechaza la promesa con el error
      }
    });
  }

  getMaterial(id:any){
    return this.http.get('http://localhost:8080/material/listMaterialIdFormation/' + id)
  }

  deleteMaterial(id:any): Promise<any>{
    const token: string | null = localStorage.getItem('Authorization')
    const headers = new HttpHeaders({'Authorization': token!})
    const params = new HttpParams();

    return new Promise((resolve, reject) => {
      try {
        this.http.delete('http://localhost:8080/material/delete/' + id).subscribe(
          response => {
            console.log(response);
            resolve(response); // Resuelve la promesa con la respuesta del servidor
          },
          error => {
            reject(error); // Rechaza la promesa con el error
          }
        );
      } catch (error) {
        reject(error); // Rechaza la promesa con el error
      }
    });

  }
}
