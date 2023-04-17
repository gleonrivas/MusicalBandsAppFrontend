import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {RestService} from "./rest.service";
import {FormationModel} from "../models/formation.model";

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  public apikey = localStorage.getItem('token')
  constructor(private rest: RestService ) { }

  private formation!:FormationModel;

  setFormation(formation: FormationModel) {
    this.formation = formation;
  }
  getFormation(): FormationModel {
    return this.formation;
  }

  getUserFormations(){
    return this.rest.get<FormationModel[]>('http://localhost:8080/formation/listByUser')
  }




}
