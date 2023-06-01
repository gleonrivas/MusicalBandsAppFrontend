import {Injectable} from "@angular/core";
import {RestService} from "./rest.service";
import {PayLowModel} from "../models/payLow.model";
import {ExternalMusicianTreasury} from "../models/externalMusician.model";
import {CalendarEventDTODelete} from "../models/eventModels/CalendarEventDTODelete";

@Injectable({
  providedIn: 'root'
})
export class TreasuryService {

  constructor(private restService: RestService) {
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

}
