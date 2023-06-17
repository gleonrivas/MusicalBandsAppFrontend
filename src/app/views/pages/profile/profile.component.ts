import {Component, OnInit, Renderer2} from '@angular/core';
import {ProfileService} from "../../../shared/services/profile.service";
import {UserType} from "../../../shared/models/userType.model";
import {Router} from "@angular/router";
import { HttpErrorResponse } from '@angular/common/http';
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private profileService: ProfileService,
    private rt: Router,
    private toastController: ToastController,
  ) {
  }

  public profile!: UserType;

  public name?: string
  public surName?: string
  public email?: string
  public url?: string | ArrayBuffer | null
  public dni: any
  public birthDate: any;
  public file: FileReader | undefined;
  public fake?: any;

  comprobarDNI(dni: string): boolean {
    const regexDNI = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/;
    if (!regexDNI.test(dni)) {
      return false;
    }
    const numero = parseInt(dni.substr(0, 8), 10);
    const letra = dni.substr(8, 1).toUpperCase();
    const letrasDNI = 'TRWAGMYFPDXBNJZSQVHLCKE';
    const letraCalculada = letrasDNI.charAt(numero % 23);
    return letra === letraCalculada;
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      color: color
    });

    await toast.present();


  }


  ngOnInit() {

    if (!sessionStorage.getItem('Authorization') || sessionStorage.getItem('Authorization') == '') {
      this.rt.navigateByUrl('/login')
    }

    this.profileService.getUserData().subscribe((data) => {
      this.profile = data;
      this.name = data.name;
      this.surName = data.surName;
      this.email = data.email;
      this.url = data.url;
      this.fake = data.fake;
      this.dni = data.dni!;
      if (!data.birthDate) {
        this.birthDate = null
      } else {
        this.birthDate = data.birthDate?.slice(0, 4) + '-' + data.birthDate?.slice(5, 7) + '-' + data.birthDate?.slice(8, 10)!
      }
    })
    console.log(this.profile)
  }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: ProgressEvent) => {

        this.url = (<FileReader>event.target).result;
      }

      reader.readAsDataURL(event.target.files[0]);
    }

  }

  sendData() {


    var newProfile: UserType = {


      name: this.name,
      surName: this.surName,
      email: this.email,
      url: this.url,
      dni: this.dni,
      birthDate: this.birthDate,
    }
    if (this.name && this.surName && this.email) {
      this.profileService.postProfileData(newProfile).subscribe(
        response => {
          this.presentToast('Se han guardado los datos correctamente', 'success')
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
          this.presentToast('Se han guardado los datos correctamente', 'success')// Accede al status del error
        }
      );
    } else {
      this.presentToast('Hubo un problema con algún campo. Revisa los datos.', 'danger')// Accede al status del error
    }

    console.log(newProfile);

  }

}
