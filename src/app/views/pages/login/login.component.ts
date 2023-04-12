import { Component } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { User } from "../../../shared/models/user.model";
import { IonicModule } from '@ionic/angular';
import {LoginService} from "./service/login.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [LoginService],
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  constructor(private loginService: LoginService) {
  }
  currentUser: User = { user: '', password: '' };
  async login(){
    const body = {
      "email": this.currentUser.user,
      "password": this.currentUser.password
    };
    await this.loginService.loginMethod(body).subscribe((data: any) => {
      console.log(data)
      if (data.token === 0){
        alert(data.error)
      }
      else{
        localStorage.setItem('token', data.token)
      }
    })
  }
}
