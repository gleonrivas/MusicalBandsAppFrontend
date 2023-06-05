import {Injectable} from "@angular/core";
import {RestService} from "./rest.service";
import {PayLowModel} from "../models/payLow.model";
import {ExternalMusicianTreasury} from "../models/externalMusician.model";
import {CalendarEventDTODelete} from "../models/eventModels/CalendarEventDTODelete";
import {PayFormation} from "../models/payFormation";
import {Treasury} from "../models/treasury";
import {FormationIdDTO} from "../models/formationIdDTO";
import {FormationService} from "./formation.service";
import {FormationType} from "../models/formationType.model";
import {Observable} from "rxjs";
import {HttpResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TreasuryService {

  constructor(private restService: RestService, private readonly formationService: FormationService,) {
  }

  getAllExternalMusicianByFormation(payLowModel: PayLowModel) {

    return this.restService.post<PayLowModel, ExternalMusicianTreasury[]>('http://localhost:8080/treasury/getAllExternalMusician', payLowModel)

  }

  payMusician(idMusician: number) {
    return this.restService.post<Object, ExternalMusicianTreasury>('http://localhost:8080/treasury/payMusician', {externalMusicianId: idMusician})
  }

  chargeEvent(idEvent: number) {
    return this.restService.post<Object, CalendarEventDTODelete>("http://localhost:8080/treasury/payEvent", {calendarId: idEvent})
  }

  closeSeason(payLowModel: PayLowModel) {
    return this.restService.post<Object, PayFormation>("http://localhost:8080/treasury/payFormationJson", payLowModel);
  }

  downloadPdfSeason(payLowModel: PayLowModel) {
    return this.restService.postPdf<Object>("http://localhost:8080/treasury/payFormationPdf", payLowModel, 'application/pdf');
  }

  getFormationByTreasuryId(id: number): Promise<Observable<FormationType>> {
    return new Promise((resolve) => {
      this.restService.get<FormationIdDTO>(`http://localhost:8080/treasury/${id}`).subscribe({
        next: (data) => {
          resolve(this.formationService.getFormationById(parseInt(data.formationId)));
        }
      });
    })
  }

  getAllMoney(payLow: PayLowModel) {
    return this.restService.post<PayLowModel, Treasury[]>('http://localhost:8080/treasury/getAllMoney', payLow)
  }

  getTreasuryByFormationId(id: number) {
    return this.restService.get<Treasury>(`http://localhost:8080/treasury/${id}`);
  }

  deleteUserFromFormation(payLow: PayLowModel) {
    return new Promise((resolve, reject) => {

      return this.restService.post<PayLowModel>("http://localhost:8080/treasury/payLow", payLow).subscribe({
        next: () => {
          this.formationService.deleteUserFromFormation(payLow).subscribe({
            next: () => {
              resolve(null);
            },
            error: reject,
          })
        },
        error: reject
      });
    })
  }


}
