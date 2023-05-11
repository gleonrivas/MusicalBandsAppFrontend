import {Component, OnInit} from '@angular/core';
import {RepertoryService} from "../../../shared/services/repertory.service";
import {FormationService} from "../../../shared/services/formation.service";
import {Router} from "@angular/router";
import {RepertoryType} from "../../../shared/models/repertoryType.model";
import {AlertController, ToastController} from "@ionic/angular";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-repertory',
  templateUrl: './repertory.component.html',
  styleUrls: ['./repertory.component.css']
})
export class RepertoryComponent implements OnInit{

  isModalOpen = false;
  public repertories:RepertoryType[]=[]

  public name = '';
  public description = '';

  constructor(
    private rt:Router,
    private repertoryService:RepertoryService,
    private formationService:FormationService,
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


  ngOnInit(){
    this.name = ''
    this.description = ''
    this.repertoryService.getRepertoryByIdFormation(parseInt(sessionStorage.getItem('idFormation')!)).subscribe((data) => {
      this.repertories = data
    });
  }

  sendRepertory(){

    if (this.name && this.description){
      if (this.name.length > 25){
        this.inputErrorAlert('Solo se permiten 25 caracteres en el nombre.')
      } else if (this.description.length > 100){
        this.inputErrorAlert('Solo se permiten 100 caracteres en la descrioción.')
      }else {
        var newRepertory:RepertoryType = {
          name:this.name,
          description:this.description,
          idFormation:sessionStorage.getItem('idFormation')!
        }
        this.repertoryService.saveRepertory(newRepertory).subscribe(
          respone =>{},
          (error: HttpErrorResponse) => {
            this.presentToast('Hubo un problema, inténtalo mas tarde.', 'danger');
          },
          () =>{
            this.presentToast('Se ha creado el nuevo repertorio.', 'success');
            this.setOpen(false)
            this.ngOnInit()
          }
        )
      }
    } else {
      this.inputErrorAlert('Parece que hay algún campo vacío. Completalo.')
      console.log(this.name, this.description)
    }
  }

  deleteRepertory(idRepertory:number){

    this.repertoryService.deleteRepertory(idRepertory).subscribe(
      (response) => {
        this.presentToast('Se ha eliminado correctamente el repertorio.', 'success');
        this.rt.navigateByUrl('/repertory');
      },
      (error: HttpErrorResponse) => {
        this.presentToast('Hubo un problema, inténtalo más tarde.', 'danger');
        console.log(error);
      }
    );
  }


}