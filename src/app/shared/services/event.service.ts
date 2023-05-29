import {Injectable} from "@angular/core";
import {RestService} from "./rest.service";
import {EncryptionService} from "./encryption.service";
import {FormationType} from "../models/formationType.model";
import {EventResponse} from "../models/eventModels/eventResponse";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CalendarEventDTODelete} from "../models/eventModels/CalendarEventDTODelete";
import {CalendarEventUpdateDTO} from "../models/eventModels/calendarEventUpdateDTO";
import {ResponseStringModel} from "../models/responseString.model";


@Injectable({
  providedIn: 'root'
})
export class EventService{
  public apikey = sessionStorage.getItem('Authorization')
  constructor(
    private rest: RestService,
    private encryptionService: EncryptionService,
    private http: HttpClient
  ) { }
  private getHeaders() {
    const apiToken = sessionStorage.getItem("Authorization");
    const headers = new HttpHeaders();
    return headers.set("Authorization", apiToken!);
  }
  getEventById(eventID:number){
    return this.rest.get<EventResponse>('http://localhost:8080/calendar/findEvent/'+eventID);
  }

  getFormationByIdCalendar(eventID:number){
    return this.rest.get<FormationType>('http://localhost:8080/calendar/findFormation/'+eventID);
  }

  updateCalendar(calendarUpdate:CalendarEventUpdateDTO){
    return this.rest.put<CalendarEventUpdateDTO,EventResponse>('http://localhost:8080/calendar/update',calendarUpdate)
  }
  
  deleteCalendar(eventId:number){
    let calendarEvent:CalendarEventDTODelete = {
      idCalendarEvent: eventId.toString()
    }
    return this.rest.deleteBody<CalendarEventDTODelete,ResponseStringModel>('http://localhost:8080/calendar/delete', calendarEvent)
  }
}
