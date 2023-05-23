import { Component } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Register} from "../../../shared/models/register.model";
import {User} from "../../../shared/models/user.model";
import {RegisterService} from "./service/register.service";
import {Router} from "@angular/router";
import {ToastController} from "@ionic/angular";
import {GeneralService} from "../../../shared/services/general.service";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  providers: [RegisterService],
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  constructor(private registerService: RegisterService, private router: Router, private generalService: GeneralService) {
  }
  newUser: Register = { name: '', surname: '', email: '', password: '' }
  registerUser(){
    const body =
      {'firstname':this.newUser.name,
        'secondname':this.newUser.surname,
        'email':this.newUser.email,
        'password':this.newUser.password};

    const isEmpty = this.generalService.emptyChecker(body)
    if (isEmpty){
      this.generalService.presentToast('Debes rellenar todos los campos.', 'danger')
    }
    else {
      this.registerService.registerMethod(body);
      this.generalService.presentToast('¡Registro completado', 'success')
      this.router.navigate(['/login'])
    }
  }
}
