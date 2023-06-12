import {AfterViewInit, Component, OnInit} from '@angular/core';
import {SquadService} from "./service/squad.service";
import {FormationService} from "../../../shared/services/formation.service";
import {EChartsOption} from "echarts";
import {FormationType} from "../../../shared/models/formationType.model";
import { trigger, transition, style, animate } from '@angular/animations';
import {GeneralService} from "../../../shared/services/general.service";
import {newRole} from "../../../shared/models/newRole.model";

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

  allRoles: any;
  owner = false;
  admin = false;
  president = false;
  treasurer = false;
  newRole: newRole = { EnumRolUserFormation: '', userId: 0, formationId: 0}

  roleOptions = [
    { value: 'OWNER', label: 'Propietario' },
    { value: 'PRESIDENT', label: 'Presidente' },
    { value: 'DIRECTOR_MUSICAL', label: 'Director musical' },
    { value: 'VOCALIST', label: 'Vocalista' },
    { value: 'TREASURER', label: 'Tesorero' },
    { value: 'ADMINISTRATOR', label: 'Administrador' },
    { value: 'ARCHIVIST', label: 'Archivero' },
    { value: 'ASSISTANCE_CONTROL', label: 'Control de asistencia' },
    { value: 'PERCUSSION', label: 'Percusionista' },
    { value: 'HAND_PERCUSSION_DE_MANO', label: 'Percusionista de mano' },
    { value: 'KEYBOARD_INSTRUMENT', label: 'Teclista' },
    { value: 'ELECTRONIC_INSTRUMENTS', label: 'Instrumento electrónico' },
    { value: 'PULSED_STRINGS', label: 'Cuerda pulsada' },
    { value: 'BOWED_STRINGS', label: 'Cuerda' },
    { value: 'WINDWOOD', label: 'Viento madera' },
    { value: 'BRASS_INSTRUMENTS', label: 'Viento metal' },
    { value: 'COMPONENT', label: 'Componente' }
  ];


  async ngOnInit(){

    const elements:any = document.getElementsByClassName('container');
    let squad = await this.formationService.getFormation().toPromise();
    // @ts-ignore
    this.id = squad.id;
    this.allRoles = await this.generalService.getUserRol(this.id);
    console.log(this.allRoles);
    this.checkRol(this.allRoles)
    sessionStorage.setItem('idFormacionC', this.id);
    await this.squadService.checkLink(this.id).subscribe(
      response => {
        // @ts-ignore
        if (response.link !== null){
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
        for (let event of this.allEvents){
          // @ts-ignore
          if(event.date !== null){
            // @ts-ignore
            if (event.type === "CONCERT"){

              this.nextPerformance.push(event)
            }
            // @ts-ignore
            if (event.type === "PRACTICE"){
              this.nextRehearsal.push(event)
            }
          }
        }
      }
    )
    await this.generalService.getUsers().subscribe(
      response => {
        this.usersList = response
        console.log(this.usersList)
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

  getRoleEquivalent(roleType: string): string {
    const roleMapping = {
      OWNER: 'Propietario',
      PRESIDENT: 'Presidente',
      DIRECTOR_MUSICAL: 'Director musical',
      VOCALIST: 'Vocalista',
      TREASURER: 'Tesorero',
      ADMINISTRATOR: 'Administrador',
      ARCHIVIST: 'Archivero',
      ASSISTANCE_CONTROL: 'Control de asistencia',
      PERCUSSION: 'Percursionista',
      HAND_PERCUSSION_DE_MANO: 'Percursionista de mano',
      KEYBOARD_INSTRUMENT: 'Teclista',
      ELECTRONIC_INSTRUMENT: 'Instrumento electrónico',
      PULSED_STRINGS: 'Cuerda pulsada',
      BOWED_STRINGS: 'Cuerda',
      WINDWOOD: 'Viento madera',
      BRASS_INSTRUMENT: 'Viento metal',
      COMPONENT: 'Miembro'
    };




    // @ts-ignore
    return roleMapping[roleType] || roleType;
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

  checkRol(array: any){
    for (let rol in array) {
      const currentRol = array[rol]; // Accede al objeto actual
      console.log(currentRol.type); // Imprime el valor de la propiedad 'id' del objeto actual

      if (currentRol.type === 'OWNER') {
        this.owner = true;
      }
      if (currentRol.type === 'PRESIDENT') {
        this.president = true;
      }
      if (currentRol.type === 'ADMINISTRATOR') {
        this.admin = true;
      }
      if (currentRol.type === 'TREASURER') {
        this.treasurer = true;
      }

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

  async createNewRol(userId: any){
    await this.squadService.createRol(userId, this.newRole.EnumRolUserFormation);
    await this.generalService.getUsers().subscribe(
      response => {
        this.usersList = response
      }
    )
  }

  deleteRol(id:any){
    console.log(id)
    this.squadService.deleteRol(id);
    this.generalService.presentToast('Rol eliminado', 'success')
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
