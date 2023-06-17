import {Injectable} from "@angular/core";
import {RestService} from "./rest.service";
import {EncryptionService} from "./encryption.service";
import {FormationType} from "../models/formationType.model";
import {EventResponse} from "../models/eventModels/eventResponse";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CalendarEventDTODelete} from "../models/eventModels/CalendarEventDTODelete";
import {CalendarEventUpdateDTO} from "../models/eventModels/calendarEventUpdateDTO";
import {ResponseStringModel} from "../models/responseString.model";
import {PayLowModel} from "../models/payLow.model";
import {CalendarType} from "../models/calendarType.model";


@Injectable({
  providedIn: 'root'
})
export class EventService {
  public apikey = sessionStorage.getItem('Authorization')

  constructor(
    private rest: RestService,
    private encryptionService: EncryptionService,
    private http: HttpClient
  ) {
  }

  private getHeaders() {
    const apiToken = sessionStorage.getItem("Authorization");
    const headers = new HttpHeaders();
    return headers.set("Authorization", apiToken!);
  }

  getMyEvents(){
    return this.rest.get<CalendarType[]>('http://localhost:8080/calendar/AllMyEvents2')
  }

  getEventById(eventID: number) {
    return this.rest.get<EventResponse>('http://localhost:8080/calendar/findEvent/' + eventID);
  }

  getFormationByIdCalendar(eventID: number) {
    return this.rest.get<FormationType>('http://localhost:8080/calendar/findFormation/' + eventID);
  }

  updateCalendar(calendarUpdate: CalendarEventUpdateDTO) {
    return this.rest.put<CalendarEventUpdateDTO, EventResponse>('http://localhost:8080/calendar/update', calendarUpdate)
  }

  deleteCalendar(eventId: number) {
    let calendarEvent: CalendarEventDTODelete = {
      idCalendarEvent: eventId.toString()
    }
    return this.rest.deleteBody<CalendarEventDTODelete, ResponseStringModel>('http://localhost:8080/calendar/delete', calendarEvent)
  }

  getEventsByIdFormation(payLow: PayLowModel) {
    return this.rest.post<PayLowModel, EventResponse[]>('http://localhost:8080/treasury/getAllEvents', payLow)
  }

}
