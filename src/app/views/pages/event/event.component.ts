import { Component } from '@angular/core';
import {EventResponse} from "../../../shared/models/eventModels/eventResponse";
import {ActivatedRoute, Router} from "@angular/router";
import {EventService} from "../../../shared/services/event.service";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {
  constructor(private readonly router: ActivatedRoute,
              private readonly eventService: EventService,
              private readonly route: Router) {
  }

  public id_event: number = -1;
  public event: EventResponse = {
    id : -1,
    place : "",
    date: new Date(),
    title: "",
    description: "",
    type: "",
    paid: true,
    amount: -1,
    penaltyPonderation: -1
  }
  public day:number = -1;
  public monthList:string[] = ["Enero", "Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Noviembre","Diciembre"];
  public numberMonth:number= -1;
  public fecha:Date=new Date();
  public  month:string= "";
  ngOnInit() {

    this.router.paramMap.subscribe((value) => {
      const id = value.get('id_event');
      if (id !== null) {
        this.id_event = parseInt(id);
      }
    });

    this.eventService.getEventById(this.id_event).subscribe((data) => {
      this.event = data;
      this.fecha= this.event.date;
      let fechastring = this.fecha.toString();
      console.log(fechastring);
      let cadena:string = fechastring.slice(5,-3);
      this.numberMonth = parseInt(cadena);
      this.month = this.monthList[this.numberMonth-1];
      this.day=Math.abs(parseInt(fechastring.slice(7)));

    })

  }

}
