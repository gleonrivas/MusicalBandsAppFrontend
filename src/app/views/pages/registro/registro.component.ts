import { Component } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Register} from "../../../shared/models/register.model";
import {User} from "../../../shared/models/user.model";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  newUser: Register = { user: '', email: '', password: '' }
  guardarUsuario(){
    const headers = new HttpHeaders()
    const body = JSON.stringify(
      {'usuario':this.newUser.user,
        'email':this.newUser.email,
        'password':this.newUser.password})
    console.log(body)
    const params = new HttpParams()
   /// Lugar para el método get o post
  }
}
