import { Injectable } from '@angular/core';
import {RestService} from "./rest.service";
import {RepertoryType} from "../models/repertoryType.model";

@Injectable({
  providedIn: 'root'
})
export class RepertoryService {

  constructor(private restService:RestService) { }

  getRepertoriesByIdFormation(idFormation:number){
    return this.restService.get<RepertoryType[]>('http://localhost:8080/repertory/list/'+idFormation);
  }

  getRepertoryById(id:number){
    return this.restService.get<RepertoryType>('http://localhost:8080/repertory/'+id);
  }

  saveRepertory(repertory:RepertoryType){
    return this.restService.post('http://localhost:8080/repertory/create', repertory);
  }

  deleteRepertory(idRepertory:number){
    return this.restService.delete('http://localhost:8080/repertory/delete/'+idRepertory);
  }

}
