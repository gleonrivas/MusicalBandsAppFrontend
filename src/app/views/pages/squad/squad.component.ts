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


  usersList: any;
  finalSquad: any;
  // @ts-ignore
  link: boolean;

  invitation: any;

  id: any;

  repertory: any;

  actualLink: any;

  nextPerformance: any[] = [];
  nextRehearsal: any[] = [];



  allEvents: any;

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
        else{
          this.link = false
        }
      }
    )

    await this.squadService.getEvents().subscribe(
      response => {
        this.allEvents = response
        this.orderEvents();
        console.log(this.allEvents)
        for (let event of this.allEvents){
          // @ts-ignore
          if(event.date !== null){
            console.log('pass1')
            console.log(event)
            // @ts-ignore
            if (event.type === "CONCERT"){
              console.log('pass2')
              this.nextPerformance.push(event)
            }
            // @ts-ignore
            if (event.type === "PRACTICE"){
              console.log('pass3')
              this.nextRehearsal.push(event)
            }
            console.log('Concert:', this.nextPerformance);
            console.log('Practice:', this.nextRehearsal);
          }
        }
      }
    )
    await this.generalService.getUsers().subscribe(
      response => {
        this.usersList = response
      }
    )
    this.finalSquad = {
      // @ts-ignore
      'name': squad?.name,
      // @ts-ignore
      'logo': squad?.logo,
      'repertory': '',
    };
    this.repertory = await this.squadService.checkRepertory(this.id);
    this.allEvents = this.squadService.getEvents()


  }
  async openLink(){
    const linkSpace:any = document.getElementById('invitationLink');
    if (!this.link){
      await this.squadService.createLink(this.id).subscribe((data: any) => {
        this.invitation = data.link
      })
      this.generalService.presentToast('Link creado con exito', 'success')
      linkSpace.style.display = 'block';
      this.ngOnInit()
    }
    else{
      this.squadService.deleteLink(this.id)
      this.generalService.presentToast('Link eliminado', 'success')
      linkSpace.style.display = 'none'
      this.ngOnInit()
    }
  }

  async openLinkWhassapp(){
    window.open("https://api.whatsapp.com/send?text=" + this.invitation );
  }

  async openLinkFacebook(){
    window.open("http://www.facebook.com/sharer.php?u=" + this.invitation );
  }

  showPeople(event: any) {
    if (event.detail.value !== undefined){

    }
  }

  orderEvents() {
    // Ordenar eventos por fecha de forma ascendente
    // @ts-ignore
    this.allEvents.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    });

    const currentDate = new Date();
    const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

    // Filtrar eventos pasados y eliminarlos de la lista
    // @ts-ignore
    this.allEvents = this.allEvents.filter((event) => {
      if (event.date !== null) {
        const eventDate = new Date(event.date);
        return eventDate >= today;
      }
      return true;
    });
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
