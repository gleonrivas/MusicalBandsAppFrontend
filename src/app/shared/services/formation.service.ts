import { Injectable } from '@angular/core';
import {RestService} from "./rest.service";
import {FormationType} from "../models/formationType.model";
import { EncryptionService } from './encryption.service';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  public apikey = localStorage.getItem('Authorization')
  constructor(
    private rest: RestService,
    private encryptionService: EncryptionService
  ) { }

  private formation!:FormationType;

  setFormation(formation: FormationType) {
    this.formation = formation;
    /*// @ts-ignore
    sessionStorage.setItem('idFormation', formation.id)
        */

    console.log(formation.id!.toString())
    // @ts-ignore
    sessionStorage.setItem('idFormation', this.encryptionService.encrypt(formation.id!.toString()))
    console.log('setFormationMethod '+this.encryptionService.encrypt(formation.id!.toString()))

  }
  getFormation(): Observable<FormationType> {
    // return this.getFormationById(parseInt(sessionStorage.getItem('idFormation')!));
    console.log('getFormationEncriptService '+ parseInt(this.encryptionService.decrypt(sessionStorage.getItem('idFormation')!)))
    return this.getFormationById(parseInt(this.encryptionService.decrypt(sessionStorage.getItem('idFormation')!)));

  }

  formationFinder(formationName:string){
    return this.rest.get<FormationType[]>('http://localhost:8080/formation/listByUser'+formationName);
  }

  getFormationById(formationID:number){
    return this.rest.get<FormationType>('http://localhost:8080/formation/listById/'+formationID);
  }

  getUserFormationsByOwner(){
    return this.rest.get<FormationType[]>('http://localhost:8080/formation/listByOwner')
  }
  getUserFormationsByUser(){
    return this.rest.get<FormationType[]>('http://localhost:8080/formation/listByUser')
  }
  getUserFormationByInvitation(invitation:any){
    return this.rest.post<FormationType>('http://localhost:8080/formation/findByInvitationLink', invitation)
  }





}
