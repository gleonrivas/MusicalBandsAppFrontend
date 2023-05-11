import {Component, OnInit} from '@angular/core';
import {ProfileService} from "../../../shared/services/profile.service";
import {AlertController, ToastController} from "@ionic/angular";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent{
  isModalOpen = false;

  oldpasswd?:string
  newpasswd1?:string
  newPasswd2?:string

  constructor(
    private profileService:ProfileService,
    private alertController: AlertController,
    private toastController: ToastController,
  ) {
  }
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  async inputErrorAlert(mensaje:string) {
    const alert = await this.alertController.create({
      header: 'Vaya...',
      message: mensaje,
      buttons: ['Lo reviso']
    });

    await alert.present();
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

  passwdRequirement(password: string): boolean {
    if (password.length < 10) {
      return false;
    }

    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*()]/.test(password);

    return hasUppercase && hasLowercase && hasNumber && hasSpecialCharacter;
  }

  modifyPassword() {

    let requestBody = {
      oldPassword :this.oldpasswd,
      newPassword1 :this.newpasswd1,
      newPassword2:this.newPasswd2
    }

    // if(this.passwdRequirement(this.newpasswd1!)){
    //   this.inputErrorAlert('1. El string debe tener al menos 10 caracteres.\n' +
    //     '2. Debe contener al menos una letra mayúscula y una minúscula.\n' +
    //     '3. Debe contener al menos un número.\n' +
    //     '4. Debe contener al menos un carácter especial obtenible con un atajo de teclado predeterminado (por ejemplo, !@#$%^&*()).')
    // } else
    if (this.newpasswd1 != this.newPasswd2){
      this.inputErrorAlert('Las contraseñas no coinciden.')
    } else if (!this.oldpasswd||!this.newpasswd1||!this.newPasswd2){
      this.inputErrorAlert('No pueden haber campos vacíos.')
    } else {
      this.profileService.postPasswordData(requestBody).subscribe((data) =>{
          console.log(data)
        },
        (error:HttpErrorResponse) => {
          this.presentToast('Hubo un error, revisa la contraseña antigua o inténtalo más tarde.', 'danger');
          console.log(error)
        },
        ()=>{
          this.presentToast('Se ha guardado la contraseña nueva :D.', 'success');

        }
      )

    }

    }



}
