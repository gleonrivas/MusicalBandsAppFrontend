import {AfterViewInit, Component, OnInit} from '@angular/core';
import {SquadService} from "./service/squad.service";
import {FormationService} from "../../../shared/services/formation.service";
import {EChartsOption} from "echarts";
import {FormationType} from "../../../shared/models/formationType.model";
import { trigger, transition, style, animate } from '@angular/animations';
import {GeneralService} from "../../../shared/services/general.service";

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

  constructor(private formationService:FormationService, private squadService:SquadService, private generalService: GeneralService) {}


  finalSquad: any;
  link = false;

  invitation: any;

  id: any;

  repertory: any;

  actualLink: any;

  async ngOnInit(){
    const elements:any = document.getElementsByClassName('container');
    let squad = await this.formationService.getFormation().toPromise();
    // @ts-ignore
    this.id = squad.id;
    sessionStorage.setItem('idFormacionC', this.id);
    await this.squadService.checkLink(this.id).subscribe(
      response => {
        // @ts-ignore
        console.log(response.link)
        // @ts-ignore
        if (response.link !== null){
          console.log('No es nulo')
          const linkSpace:any = document.getElementById('invitationLink');
          linkSpace.style.display = 'block'
          // @ts-ignore
          this.invitation = response.link
          this.link = true
        }
      }
    )

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
      this.generalService.presentToast('Link creado con exito', 'success')
      linkSpace.style.display = 'block';
      this.link = true;
    }
    else{
      this.generalService.presentToast('Link eliminado', 'success')
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
