import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

import {EChartsOption, getInstanceByDom} from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';
import {connect} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class SquadService {
  constructor(private http: HttpClient) { }

  chart(){

  }

  createLink(id: any){
    const token: string | null = localStorage.getItem('Authorization')
    const headers = new HttpHeaders({'Authorization': token!})
    const params = new HttpParams();
    const body = {'':''}
    return this.http.post('http://localhost:8080/InvitationLink/create/' + id, body, {headers: headers, params: params})
  }

}
