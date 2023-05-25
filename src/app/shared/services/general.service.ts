import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {ToastController} from "@ionic/angular";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

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

}
