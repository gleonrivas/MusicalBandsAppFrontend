import { Injectable } from '@angular/core';
import {RestService} from "./rest.service";
import {FormationType} from "../models/formationType.model";
import {EnumFormationType} from "../models/Enum/EnumFormationType";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  public apikey = localStorage.getItem('Authorization')
  constructor(private rest: RestService) { }

  private formation!:FormationType;

  setFormation(formation: FormationType) {
    this.formation = formation;
    sessionStorage.setItem('idFormation', formation.id)
  }
  getFormation(): Observable<FormationType> {
    return this.getFormationById(parseInt(sessionStorage.getItem('idFormation')!));
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
    return this.rest.get<FormationType[]>('http://localhost:8080/formation/listByOwner')
  }





}
