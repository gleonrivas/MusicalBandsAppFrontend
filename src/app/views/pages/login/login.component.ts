import { Component } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import { User } from "../../../shared/models/user.model";
import { IonicModule } from '@ionic/angular';
import {LoginService} from "./service/login.service";
import {Router} from "@angular/router";
import {ToastController} from "@ionic/angular";
import {GeneralService} from "../../../shared/services/general.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [LoginService],
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  constructor(private loginService: LoginService, private router: Router, private generalService: GeneralService) {}
  currentUser: User = { user: '', password: '' };

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  modalOpen(){
    const search:any = document.getElementById('modal');
    if (this.isModalOpen === false){
      search.style.display = 'block'
      this.isModalOpen = true;
    }
    else {
      search.style.display = 'none';
      this.isModalOpen = false;
    }
  }
  async login() {
    this.modalOpen();
    try {
      const body = {
        email: this.currentUser.user,
        password: this.currentUser.password
      };
      const response = await this.loginService.loginMethod(body).toPromise();
      console.log(response);
      // @ts-ignore
      localStorage.setItem('Authorization', 'Bearer ' + response.token);
      this.modalOpen();
      this.router.navigate(['/home']);
    } catch (error) {
      console.error(error);
      if (error instanceof HttpErrorResponse && error.status === 400) {
        const token = error.error.token
        if (token === 0) {
          this.modalOpen();
          this.generalService.presentToast('Usuario o contraseña erronea.', 'danger')
        }
      }
    }
  }
}
