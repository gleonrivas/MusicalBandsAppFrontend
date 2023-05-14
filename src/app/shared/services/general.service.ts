import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {ToastController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})

export class GeneralService{

  constructor(private route: Router, private toastController:ToastController) {
  }
  logOut(){
    localStorage.setItem('token', '');
    this.route.navigate(['/login']);
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

}
