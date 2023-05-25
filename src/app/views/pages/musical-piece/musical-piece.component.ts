import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {RepertoryType} from "../../../shared/models/repertoryType.model";
import {FormationType} from "../../../shared/models/formationType.model";
import {MusicalPieceService} from "../../../shared/services/musical-piece.service";
import {AlertController, ToastController} from "@ionic/angular";
import {EncryptionService} from "../../../shared/services/encryption.service";
import {MusicalPieceType} from "../../../shared/models/musicalPieceType.model";
import {HttpErrorResponse} from "@angular/common/http";
import {RepertoryService} from "../../../shared/services/repertory.service";

@Component({
  selector: 'app-musical-piece',
  templateUrl: './musical-piece.component.html',
  styleUrls: ['./musical-piece.component.css']
})
export class MusicalPieceComponent {

  isModalOpen = false;
  public musicalPieces!:MusicalPieceType[];
  public repertory!:RepertoryType;

  public name?:string;
  public author?:string;
  public duration?:number;
  public idRepertory?:string;

  constructor(
    private rt:Router,
    private musicalPieceService:MusicalPieceService,
    private repertoryService:RepertoryService,
    private alertController: AlertController,
    private toastController: ToastController,
    private encryptionService: EncryptionService
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
    this.musicalPieceService.getMusicalPieceByRepertoryId(parseInt(this.encryptionService.decrypt(sessionStorage.getItem('idRepertory')!))).subscribe((data) => {
      this.musicalPieces = data
    });
    this.repertoryService.getRepertoryById(parseInt(this.encryptionService.decrypt(sessionStorage.getItem('idRepertory')!))).subscribe((data)=>{
      this.repertory = data
    })
  }

  sendMusicalPiece(){

    if (this.name && this.author && this.duration && this.idRepertory){

        var newMusicalPiece:MusicalPieceType = {
          name: this.name,
          author: this.author,
          length: this.duration,
          idRepertory: parseInt(this.encryptionService.decrypt(sessionStorage.getItem('idRepertory')!))
        }
        this.musicalPieceService.createMusicalPiece(newMusicalPiece).subscribe(
          respone =>{},
          (error: HttpErrorResponse) => {
            this.presentToast('Hubo un problema, inténtalo mas tarde.', 'danger');
          },
          () =>{
            this.presentToast('Se ha creado la pieza musical '+ newMusicalPiece.name+ '.', 'success');
            this.setOpen(false)
            this.ngOnInit()
          }
        )
      } else {
      this.inputErrorAlert('Parece que hay algún campo vacío. Completalo.')
    }
  }

  deleteMusicalPiece(musicalPieceId:number){

    this.musicalPieceService.deleteMusicalPiece(musicalPieceId).subscribe(
      (response) => {
        this.presentToast('Se ha eliminado correctamente la pieza musical.', 'success');
        this.ngOnInit()
      },
      (error: HttpErrorResponse) => {
        this.presentToast('Hubo un problema, inténtalo más tarde.', 'danger');
        console.log(error);
      }
    );
  }



}
