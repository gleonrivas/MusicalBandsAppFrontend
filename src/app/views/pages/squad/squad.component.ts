import {AfterViewInit, Component, OnInit} from '@angular/core';
import {SquadService} from "./service/squad.service";
import {FormationService} from "../../../shared/services/formation.service";
import {EChartsOption} from "echarts";
import {FormationType} from "../../../shared/models/formationType.model";
import { trigger, transition, style, animate } from '@angular/animations';

export const fadeInAnimation = trigger('fadeInAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('0.5s', style({ opacity: 1 })),
  ]),
]);
@Component({
  selector: 'app-squad',
  templateUrl: './squad.component.html',
  providers: [SquadService],
  styleUrls: ['./squad.component.css']
})
export class SquadComponent{

  constructor(private formationService:FormationService, private squadService:SquadService) {}


  finalSquad: any;
  link = false;

  invitation: any;

  id: any;

  repertory: any;

  async ngOnInit(){
    const elements:any = document.getElementsByClassName('container');

    let squad = await this.formationService.getFormation().toPromise();
    // @ts-ignore
    this.id = squad.id;
    sessionStorage.setItem('idFormacionC', this.id);
    console.log(squad)
    console.log('ID: ' + sessionStorage.getItem('idFormacionC'))

    // @ts-ignore
    console.log('Squad:', squad.name);
    this.finalSquad = {
      // @ts-ignore
      'name': squad?.name,
      // @ts-ignore
      'logo': squad?.logo,
      'repertory': '',
    };
    this.repertory = await this.squadService.checkRepertory(this.id);
    console.log('Numero', this.repertory)

  }
  async openLink(){
    const linkSpace:any = document.getElementById('invitationLink');
    if (this.link === false){
      await this.squadService.createLink(this.id).subscribe((data: any) => {
        this.invitation = data.link
      })
      console.log(this.invitation)
      linkSpace.style.display = 'block';
      this.link = true;
    }
    else{
      linkSpace.style.display = 'none'
      this.link = false;
    }
  }

  initOpts = {
    renderer: 'svg',
    width: 850,
    height: 400
  };

  options: EChartsOption = {
    color: ['rgba(234,103,103,0.79)'],
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
