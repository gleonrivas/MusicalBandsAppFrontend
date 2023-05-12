import { Component } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Register} from "../../../shared/models/register.model";
import {User} from "../../../shared/models/user.model";
import {RegisterService} from "./service/register.service";
import {Router} from "@angular/router";
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  providers: [RegisterService],
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  constructor(private registerService: RegisterService, private router: Router, private toastController: ToastController) {
  }
  newUser: Register = { name: '', surname: '', email: '', password: '' }
  registerUser(){
    const body =
      {'firstname':this.newUser.name,
        'secondname':this.newUser.surname,
        'email':this.newUser.email,
        'password':this.newUser.password};
    console.log(body)
    const isEmpty = Object.values(body).some(value => value === '');
    if (isEmpty){
      this.presentToast('Debes rellenar todos los campos.', 'danger')
    }
    else {
      this.registerService.registerMethod(body);
      this.presentToast('¡Registro completado', 'success')
      this.router.navigate(['/login'])
    }
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
}
