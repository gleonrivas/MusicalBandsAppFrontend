import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RehearsalService {
  constructor(private http: HttpClient) { }

  createBody(title:any, place:any, description:any, date:any, amount:any, penaltyPonderation:any){
    const body =
      {
        "idFormation": sessionStorage.getItem('idFormacionC'),
        "enumTypeActuation":"PRACTICE",
        "title":title,
        "place":place,
        "paid":"0",
        "description":description,
        "date":date,
        "amount":amount,
        "penaltyPonderation":penaltyPonderation,
        "idRepertory":"1"
      };
    return body;
  }
}
