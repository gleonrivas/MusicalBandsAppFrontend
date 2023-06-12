import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {ToastController} from "@ionic/angular";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {RoleDTO} from "../models/roleDTO";

@Injectable({
  providedIn: 'root'
})

export class GeneralService{

  constructor(private route: Router, private toastController:ToastController, private http: HttpClient) {
  }
  logOut(){
    sessionStorage.setItem('token', '');
    this.route.navigate(['/login']);
  }

  getToken(){
    const token: string | null = sessionStorage.getItem('Authorization')
    const headers = new HttpHeaders({'Authorization': token!})
    return headers
  }

  async presentToast(message:string, color:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      color: color
    });

    await toast.present();
  }

  emptyChecker(body:any){
    const isEmpty = Object.values(body).some(value => value === '');
    return isEmpty
  }

  sendNewEvent(body: any): Promise<any>{
    const token: string | null = sessionStorage.getItem('Authorization')
    const headers = new HttpHeaders({'Authorization': token!})
    const params = new HttpParams();
    return new Promise((resolve, reject) => {
      try {
        this.http.post('http://localhost:8080/calendar/CreateEvents', body, { headers: headers, params: params }).subscribe(
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

  checkEvents(id:any) {
    const token: string | null = sessionStorage.getItem('Authorization')
    const headers = new HttpHeaders({'Authorization': token!})
    const params = new HttpParams();
    const body= { 'formationId': id};
  }

  getUsers(){
    const id = sessionStorage.getItem('idFormacionC');
    return this.http.get('http://localhost:8080/formation/listUsers2/' + id)
  }

  async getUserRol(id: any): Promise<any> {
    const token: string | null = sessionStorage.getItem('Authorization');
    const headers = new HttpHeaders({ 'Authorization': token! });

    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:8080/role/list/' + id, { headers }).subscribe(
        (response) => {
          const jsonResponse = response; // JSON de respuesta
          resolve(jsonResponse);
        },
        (error) => {
          console.error(error);
          reject(error);
        }
      );
    });
  }


  convertRole(roleList: RoleDTO[]) {
    let response: RoleDTO[] = [];

    for (let role of roleList) {

      if (role.type == "OWNER") {
        let finalRole: RoleDTO = {
          type: 'PROPIETARIO'
        };
        response.push(finalRole)
      }
      if (role.type == "PRESIDENT") {
        let finalRole: RoleDTO = {
          type: 'PRESIDENTE'
        };
        response.push(finalRole)
      }
      if (role.type == "DIRECTOR_MUSICAL") {
        let finalRole: RoleDTO = {
          type: 'DIRECTOR MUSICAL'
        };
        response.push(finalRole)
      }
      if (role.type == "VOCALIST") {
        let finalRole: RoleDTO = {
          type: 'VOCALISTA'
        };
        response.push(finalRole)
      }
      if (role.type == "TREASURER") {
        let finalRole: RoleDTO = {
          type: 'TESORERO'
        };
        response.push(finalRole)
      }
      if (role.type == "ADMINISTRATOR") {
        let finalRole: RoleDTO = {
          type: 'ADMINISTRADOR'
        };
        response.push(finalRole)
      }
      if (role.type == "ARCHIVIST") {
        let finalRole: RoleDTO = {
          type: 'ARCHIVERO'
        };
        response.push(finalRole)
      }
      if (role.type == "ASSISTANCE_CONTROL") {
        let finalRole: RoleDTO = {
          type: 'CONTROL DE ASISTENCIA'
        };
        response.push(finalRole)
      }
      if (role.type == "PERCUSSION") {
        let finalRole: RoleDTO = {
          type: 'PERCUSIONISTA'
        };
        response.push(finalRole)
      }
      if (role.type == "HAND_PERCUSSION_DE_MANO") {
        let finalRole: RoleDTO = {
          type: 'PERCUSIONISTA'
        };
        response.push(finalRole)
      }
      if (role.type == "KEYBOARD_INSTRUMENT") {
        let finalRole: RoleDTO = {
          type: 'TECLISTA'
        };
        response.push(finalRole)
      }
      if (role.type == "ELECTRONIC_INSTRUMENT") {
        let finalRole: RoleDTO = {
          type: 'INSTRUMENTO ELECTRÓNICO'
        };
        response.push(finalRole)
      }
      if (role.type == "PULSED_STRINGS") {
        let finalRole: RoleDTO = {
          type: 'CUERDA PULSADA'
        };
        response.push(finalRole)
      }
      if (role.type == "BOWED_STRINGS") {
        let finalRole: RoleDTO = {
          type: 'CUERDA'
        };
        response.push(finalRole)
      }
      if (role.type == "BRASS_INSTRUMENT") {
        let finalRole: RoleDTO = {
          type: 'VIENTO MADERA'
        };
        response.push(finalRole)
      }
      if (role.type == "COMPONENT") {
        let finalRole: RoleDTO = {
          type: 'COMPONENTE'
        };
        response.push(finalRole)
      }
    }
    return response
  }

}
