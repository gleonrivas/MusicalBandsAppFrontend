import { Component } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Register} from "../../../shared/models/register.model";
import {User} from "../../../shared/models/user.model";
import {RegisterService} from "./service/register.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  providers: [RegisterService],
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  constructor(private registerService: RegisterService, private router: Router) {
  }
  newUser: Register = { name: '', surname: '', email: '', password: '' }
  registerUser(){
    const body =
      {'firstname':this.newUser.name,
        'secondname':this.newUser.surname,
        'email':this.newUser.email,
        'password':this.newUser.password};
    console.log(body)
    this.registerService.registerMethod(body);
    this.router.navigate(['/login'])

  }
}
