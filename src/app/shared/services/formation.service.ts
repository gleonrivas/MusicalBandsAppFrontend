import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {RestService} from "./rest.service";
import {FormationType} from "../models/formationType.model";

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  public apikey = localStorage.getItem('Authorization')
  constructor(private rest: RestService ) { }

  private formation!:FormationType;

  setFormation(formation: FormationType) {
    this.formation = formation;
  }
  getFormation(): FormationType {
    return this.formation;
  }

  formationFinder(formationName:string){
    return this.rest.get<FormationType[]>('http://localhost:8080/formation/listByUser');
  }

  getUserFormationsByOwner(){
    return this.rest.get<FormationType[]>('http://localhost:8080/formation/listByOwner')
  }
  getUserFormationsByUser(){
    return this.rest.get<FormationType[]>('http://localhost:8080/formation/listByOwner')
  }





}
