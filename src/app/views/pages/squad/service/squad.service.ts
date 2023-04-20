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

}
