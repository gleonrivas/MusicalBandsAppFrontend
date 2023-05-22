import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {GeneralService} from "../../../shared/services/general.service";
import {newPerfomanceModel} from "../../../shared/models/newPerfomance.model";
import {PerfomanceService as ActuacionService} from "./service/perfomance.service";
@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.css']
})
export class PerformanceComponent {
  constructor(private generalService: GeneralService, private performanceService: ActuacionService) {}

  newPerformance: newPerfomanceModel = {title: '', place:'', description: '', date: new Date(), amount: 0, penaltyPonderation: 0, idFormation: 0 }

  async createPerformance(){
    const title = this.newPerformance.title;
    const place = this.newPerformance.place;
    const description = this.newPerformance.description;
    const date = this.newPerformance.date;
    const amount = this.newPerformance.amount;
    const penaltyPonderation = this.newPerformance.penaltyPonderation;

    const body = this.performanceService.createBody(title, place, description, date, amount, penaltyPonderation);

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

