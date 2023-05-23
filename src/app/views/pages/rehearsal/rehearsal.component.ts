import { Component } from '@angular/core';
import {GeneralService} from "../../../shared/services/general.service";
import {PerfomanceService as ActuacionService} from "../performance/service/perfomance.service";
import {newPerfomanceModel} from "../../../shared/models/newPerfomance.model";
import {RehearsalService} from "./service/rehearsal.service";

@Component({
  selector: 'app-rehearsal',
  templateUrl: './rehearsal.component.html',
  styleUrls: ['./rehearsal.component.css']
})
export class RehearsalComponent {
  constructor(private generalService: GeneralService, private rehearsalService: RehearsalService) {}

  newRehearsal: newPerfomanceModel = {title: '', place:'', description: '', date: new Date(), amount: 0, penaltyPonderation: 0, idFormation: 0 }

  async createRehearsal(){
    const title = this.newRehearsal.title;
    const place = this.newRehearsal.place;
    const description = this.newRehearsal.description;
    const date = this.newRehearsal.date;
    const amount = this.newRehearsal.amount;
    const penaltyPonderation = this.newRehearsal.penaltyPonderation;

    const body = this.rehearsalService.createBody(title, place, description, date, amount, penaltyPonderation);

    console.log(body)

    const isEmpty = this.generalService.emptyChecker(body);

    if (isEmpty){
      this.generalService.presentToast('Debes rellenar todos los campos.', 'danger')
    }
    else {
      await this.generalService.sendNewEvent(body);
      this.generalService.presentToast('Evento creado', 'success')
      //this.checkMaterials()
    }
  }
}
