import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {GeneralService} from "../../../../shared/services/general.service";
import {RestService} from "../../../../shared/services/rest.service";
import {ResponseStringModel} from "../../../../shared/models/responseString.model";

@Injectable({
  providedIn: 'root'
})
export class BorrowService {

  constructor(private http: HttpClient, private generalService: GeneralService, private rest: RestService) { }
  sendNewMaterial(body: any): Promise<any>{
    const token: string | null = sessionStorage.getItem('Authorization')
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
  editMaterial(body: any): Promise<any>{
    const token: string | null = sessionStorage.getItem('Authorization')
    const headers = new HttpHeaders({'Authorization': token!})
    const params = new HttpParams();
    return new Promise((resolve, reject) => {
      try {
        this.http.put('http://localhost:8080/material/update', body, { headers: headers, params: params }).subscribe(
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

  deleteMaterial(id: any): Promise<any> {
    const token: string | null = sessionStorage.getItem('Authorization');
    const headers = new HttpHeaders({ 'Authorization': token! });
    const params = new HttpParams();

    return new Promise((resolve, reject) => {
      try {
        this.http.delete('http://localhost:8080/material/delete/' + id, { responseType: 'text' }).subscribe(
          response => {
            resolve(response); // Resuelve la promesa con la respuesta del servidor
          },
          error => {
            if (error instanceof HttpErrorResponse && error.status === 200) {
              resolve(error.error.text); // Resuelve la promesa con el texto de error
            } else {
              reject(error); // Rechaza la promesa con el error
            }
          }
        );
      } catch (error) {
        reject(error); // Rechaza la promesa con el error
      }
    });
  }
  createDate(){
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const formatedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    return formatedDate
  }

  sessionSet(material:any){
    sessionStorage.setItem('idMaterial', material.id);
    sessionStorage.setItem('materialName', material.transferredMaterial);
    sessionStorage.setItem('materialType', material.materialType);
  }

  createBody(name:any, materialType:any){
    const formatedDate = this.createDate();
    const body =
      {"transferredMaterial" : name,
        "materialType" : materialType,
        "fullDate" : formatedDate,
        "idFormation" : sessionStorage.getItem('idFormacionC')
      };
    return body;
  }

  getUsers(){
    const id = sessionStorage.getItem('idFormacionC');
    return this.http.get('http://localhost:8080/formation/listUsers/' + id)
  }

  getBorrowedUsers(id:any){
    const body =
      {
        "materialId":id
      }
      console.log(body)
      // @ts-ignore
    return this.http.post('http://localhost:8080/material/getAllUserBorrorwedMaterial', body)
  }

  createBorrowMaterial(materialId: any, userId: any): Promise<any>{
    const token: string | null = sessionStorage.getItem('Authorization')
    const headers = new HttpHeaders({'Authorization': token!})
    const params = new HttpParams();

    const body =
      {"materialId" : materialId,
        "userId" : userId
      };
    console.log(body)
    return new Promise((resolve, reject) => {
      try {
        this.http.post('http://localhost:8080/material/createBorrowedMaterial', body, { headers: headers, params: params }).subscribe(
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


  deleteBorrowMaterial(materialId: any, userId: any): Promise<any>{
    const token: string | null = sessionStorage.getItem('Authorization');
    const headers = new HttpHeaders({ 'Authorization': token! });
    const params = new HttpParams();

    const body =
      {"materialId" : materialId,
        "userId" : userId
      };
    return new Promise((resolve, reject) => {
      try {
        this.http.delete('http://localhost:8080/material/deleteBorrowedMaterial', {body: body} ).subscribe(
          response => {
            resolve(response); // Resuelve la promesa con la respuesta del servidor
          },
          error => {
            if (error instanceof HttpErrorResponse && error.status === 200) {
              resolve(error.error.text); // Resuelve la promesa con el texto de error
            } else {
              reject(error); // Rechaza la promesa con el error
            }
          }
        );
      } catch (error) {
        reject(error); // Rechaza la promesa con el error
      }
    });
  }
}
