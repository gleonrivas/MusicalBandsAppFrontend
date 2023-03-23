import { Component } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { User } from "../../../shared/models/user.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  currentUser: User = { user: '', password: '' };
  async promise() {
    const circulo: any = document.getElementById('logro')
    circulo.style.display = "block";
    const body = JSON.stringify({
      "usuario": this.currentUser.user,
      "password": this.currentUser.password
    });
    alert(body)
    console.log(body);
    let tokencito: string = ''
    const params = new HttpParams();
    const headers = new HttpHeaders();

    const test = 10;

    return test
  }
  async login() {
    let login = await this.promise();
    console.log(login);
    // @ts-ignore
    localStorage.setItem('token', login)
    console.log(localStorage.getItem('token'))
    const circle:any = document.getElementById('logro')
    circle.style.display = "none";

    if (localStorage.getItem('token') === 'undefined'){}
    else {
      window.location.href = '/';
    }
  }

}
