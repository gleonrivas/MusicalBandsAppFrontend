import {Injectable} from "@angular/core";
import {RestService} from "./rest.service";
import {EncryptionService} from "./encryption.service";
import {FormationType} from "../models/formationType.model";
import {EventResponse} from "../models/eventModels/eventResponse";
import {AbscenceModel} from "../models/abscence.model";

@Injectable({
  providedIn: 'root'
})
export class AbsenceService{
  public apikey = sessionStorage.getItem('Authorization')
  constructor(
    private rest: RestService,
    private encryptionService: EncryptionService
  ) { }

  postAbsenceList(abscenseList:AbscenceModel){
    return this.rest.post('http://localhost:8080/absence/RegisterAbsence', abscenseList)
  }
}
