import {Injectable} from "@angular/core";
import {RestService} from "./rest.service";
import {EncryptionService} from "./encryption.service";
import {AbscenceModel} from "../models/abscence.model";
import {ResponseStringModel} from "../models/responseString.model";

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
    return this.rest.post<AbscenceModel, ResponseStringModel>('http://localhost:8080/absence/RegisterAbsence', abscenseList)
  }
}
