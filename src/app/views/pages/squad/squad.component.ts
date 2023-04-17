import {AfterViewInit, Component, OnInit} from '@angular/core';
import {EChartsOption, getInstanceByDom} from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';
import {connect} from "rxjs";
import {SquadService} from "./service/squad.service";
import {FormationService} from "../../../shared/services/formation.service";

@Component({
  selector: 'app-squad',
  templateUrl: './squad.component.html',
  providers: [SquadService],
  styleUrls: ['./squad.component.css']
})
export class SquadComponent{

  constructor(private formationService:FormationService) {
  }

  ngOnInit(){
    let id = 1;
    console.log(this.formationService.getFormation())
  }
  initOpts = {
    renderer: 'svg',
    width: 850,
    height: 400
  };

  options: EChartsOption = {
    color: ['#3398DB'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['Celia', 'Gonza', 'Luis', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [{
      type: 'value'
    }],
    series: [{
      name: 'Counters',
      type: 'bar',
      barWidth: '30%',
      data: [50, 52, 200, 334, 390, 330, 220]
    }]
  };
}
