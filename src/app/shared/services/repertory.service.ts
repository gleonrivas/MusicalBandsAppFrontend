import { Injectable } from '@angular/core';
import {RestService} from "./rest.service";
import {RepertoryType} from "../models/repertoryType.model";

@Injectable({
  providedIn: 'root'
})
export class RepertoryService {

  constructor(private restService:RestService) { }

  getRepertoryByIdFormation(idFormation:number){
    return this.restService.get<RepertoryType[]>('http://localhost:8080/repertory/list/'+idFormation)
  }

}
