import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

import {EChartsOption, getInstanceByDom} from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';
import {connect, map} from "rxjs";
import {GeneralService} from "../../../../shared/services/general.service";
import {PayLowModel} from "../../../../shared/models/payLow.model";
import {Treasury} from "../../../../shared/models/treasury";
import {TreasuryService} from "../../../../shared/services/treasury.service";
@Injectable({
  providedIn: 'root'
})
export class SquadService {
  constructor(private http: HttpClient, private generalService: GeneralService, private treasuryService: TreasuryService) { }

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



  async getDailyAmounts(payLow: PayLowModel) {
    try {
      const data: Treasury[] | undefined = await this.treasuryService.getAllMoney(payLow).toPromise();

      // Crea un objeto para almacenar la suma de amounts por día
      const dailyAmounts = {};
      console.log('Intro: ', data)

      // Recorre los elementos del array de datos
      // @ts-ignore
      data.forEach(item => {
        // @ts-ignore
        const receiveMoneyDate = item.receiveMoneyDate.split('T')[0]; // Obtiene la fecha sin la parte de tiempo

        // Si la fecha ya existe en el objeto dailyAmounts, suma el amount actual al existente
        // @ts-ignore
        if (dailyAmounts[receiveMoneyDate]) {
          // @ts-ignore
          dailyAmounts[receiveMoneyDate] += item.amount;
        } else {
          // Si la fecha no existe, crea una nueva entrada con el amount actual
          // @ts-ignore
          dailyAmounts[receiveMoneyDate] = item.amount;
        }
      });

      // Retorna el objeto con las sumas de amounts por día
      return dailyAmounts;
    } catch (error) {
      // Manejar el error de la promesa aquí
      console.error('Error al obtener los datos:', error);
      throw error;
    }
  }







}
