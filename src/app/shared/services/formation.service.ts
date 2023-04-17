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

  getUserFormations(){
    return this.rest.get<FormationModel[]>('http://localhost:8080/formation/listByUser')
  }

}
