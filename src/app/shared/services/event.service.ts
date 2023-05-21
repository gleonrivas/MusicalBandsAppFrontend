import {Injectable} from "@angular/core";
import {RestService} from "./rest.service";
import {EncryptionService} from "./encryption.service";
import {FormationType} from "../models/formationType.model";
import {EventResponse} from "../models/eventModels/eventResponse";

@Injectable({
  providedIn: 'root'
})
export class EventService{
  public apikey = localStorage.getItem('Authorization')
  constructor(
    private rest: RestService,
    private encryptionService: EncryptionService
  ) { }
  getEventById(eventID:number){
    return this.rest.get<EventResponse>('http://localhost:8080/calendar/findEvent/'+eventID);
  }

  getFormationByIdCalendar(eventID:number){
    return this.rest.get<FormationType>('http://localhost:8080/calendar/findFormation/'+eventID);
  }
}
