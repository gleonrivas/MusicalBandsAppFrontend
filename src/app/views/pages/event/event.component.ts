import {Component} from '@angular/core';
import {EventResponse} from "../../../shared/models/eventModels/eventResponse";
import {ActivatedRoute, Router} from "@angular/router";
import {EventService} from "../../../shared/services/event.service";
import {FormationType} from "../../../shared/models/formationType.model";
import {EnumFormationType} from "../../../shared/models/Enum/EnumFormationType";
import {UserFormation} from "../../../shared/models/UserFormation";
import {RoleDTO} from "../../../shared/models/roleDTO";
import {FormationService} from "../../../shared/services/formation.service";

import {UserInfo} from "../../../shared/models/user-info";
import jwtDecode from "jwt-decode";
import {GetMeService} from "../../../shared/services/get-me.service";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {
  constructor(private readonly router: ActivatedRoute,
              private readonly eventService: EventService,
              private readonly formationService: FormationService,
              private readonly getMeService: GetMeService,
              private readonly route: Router) {
  }

  public id_event: number = -1;
  public event: EventResponse = {
    id: -1,
    place: "",
    date: new Date(),
    title: "",
    description: "",
    type: "",
    paid: true,
    amount: -1,
    penaltyPonderation: -1
  }

  public formation: FormationType = {
    id: -1,
    active: true,
    designation: "",
    fundationDate: "",
    foundationYear: "",
    logo: "",
    name: "",
    type: EnumFormationType.BANDS_OF_MUSIC,
    origin: "",
  }
  public day: number = -1;
  public formationId?: number = -1;
  public monthList: string[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Noviembre", "Diciembre"];
  public numberMonth: number = -1;
  public fecha: Date = new Date();
  public month: string = "";
  public userList: UserFormation[] = [];
  public idUser?: string | null = "";
  public id_perfil: number | null = -1;
  public rolList: string[] = [];
  public userInfo: UserInfo = {
    id: -1,
    sub: "",
    iat: -1,
    exp: -1,
  }

  ngOnInit() {

    const id = this.getMeService.id;


    this.router.paramMap.subscribe((value) => {
      const id = value.get('id_event');
      if (id !== null) {
        this.id_event = parseInt(id);
      }
    });

    this.eventService.getEventById(this.id_event).subscribe((data) => {
      this.event = data;
      this.fecha = this.event.date;
      let fechastring = this.fecha.toString();
      let cadena: string = fechastring.slice(5, -3);
      this.numberMonth = parseInt(cadena);
      this.month = this.monthList[this.numberMonth - 1];
      this.day = Math.abs(parseInt(fechastring.slice(7)));

    })
    this.eventService.getFormationByIdCalendar(this.id_event).subscribe((data) => {
      this.formation = data;
      this.formationService.getUsersByFormation(this.formation.id).subscribe((data) => {
        this.userList = data;
        for(let user of this.userList){
          if(user.id==id){
            for(let rol of user.roleDTOList){
              this.rolList.push(rol.type)
            }
          }
        }
      })

    })


  }

}
