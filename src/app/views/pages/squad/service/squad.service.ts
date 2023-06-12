import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

import {EChartsOption, getInstanceByDom} from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';
import {connect} from "rxjs";
import {GeneralService} from "../../../../shared/services/general.service";
@Injectable({
  providedIn: 'root'
})
export class SquadService {
  constructor(private http: HttpClient, private generalService: GeneralService) { }

  chart(){

  }

  checkLink(id: any) {
    const token: string | null = sessionStorage.getItem('Authorization');
    const headers = new HttpHeaders({ 'Authorization': token! });
    return this.http.get('http://localhost:8080/InvitationLink/check/' + id, { headers });
  }

  createLink(id: any){
    const token: string | null = sessionStorage.getItem('Authorization')
    const headers = new HttpHeaders({'Authorization': token!})
    const params = new HttpParams();
    const body = {'':''}
    return this.http.post('http://localhost:8080/InvitationLink/create/' + id, body, {headers: headers, params: params})
  }

  async deleteLink(id:any){
    const token: string | null = sessionStorage.getItem('Authorization')
    const headers = new HttpHeaders({'Authorization': token!})
    return await this.http.delete('http://localhost:8080/InvitationLink/' + id).toPromise();
  }

  async checkRepertory(id: any): Promise<number> {
    const token: string | null = sessionStorage.getItem('Authorization')
    const headers = new HttpHeaders({'Authorization': token!})
    const data = await this.http.get('http://localhost:8080/repertory/list/' + id, { headers }).toPromise();
    // @ts-ignore
    const count = Object.keys(data).length;
    return count;
  }

  getEvents(){
    const id = sessionStorage.getItem('idFormacionC')
    const token: string | null = sessionStorage.getItem('Authorization')
    const headers = new HttpHeaders({'Authorization': token!})
    const params = new HttpParams();
    const body = {'formationId':id}
    return this.http.post('http://localhost:8080/calendar/MyEventsByFormation' , body, {headers: headers, params: params})
  }

  async createRol(userId: any, role: any){
    const id = sessionStorage.getItem('idFormacionC')
    const token: string | null = sessionStorage.getItem('Authorization')
    const headers = new HttpHeaders({'Authorization': token!})
    const params = new HttpParams();
    const body = {
      'type':role,
      'userId':userId,
      'formationId':id
    }
    console.log(body)
    await this.http.post("http://localhost:8080/role/create", body, { headers }).subscribe(
      response => {
        console.log(response)
        // @ts-ignore
        this.generalService.presentToast('Rol creado con existo', 'success');
      },
      error => {
        // @ts-ignore
        this.generalService.presentToast('Ya existe un usuario con ese rol', 'danger');
      }
    );
  }
  deleteRol(id: any){
    const body = {}
    this.http.put("http://localhost:8080/role/delete/" + id, body).subscribe( request =>
    console.log(request))
  }

}
