import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PerfomanceService {

  constructor(private http: HttpClient) { }

  createBody(title:any, place:any, description:any, date:any, amount:any, penaltyPonderation:any){
    const body =
      {
        "idFormation": sessionStorage.getItem('idFormacionC'),
        "enumTypeActuation":"CONCERT",
        "title":title,
        "place":place,
        "paid":"0",
        "description":description,
        "date":date + ":00.000",
        "amount":amount,
        "penaltyPonderation":penaltyPonderation,
        "idRepertory":"1"
      };
    return body;
  }


}
