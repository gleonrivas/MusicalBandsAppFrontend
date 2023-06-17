import {Injectable} from "@angular/core";
import {RestService} from "./rest.service";
import {EncryptionService} from "./encryption.service";
import {HttpClient} from "@angular/common/http";
import {ExternalMusicianModel, ExternalMusicianResponse} from "../models/externalMusician.model";
import {ResponseStringModel} from "../models/responseString.model";
import {MusicSheetDTO, MusicSheetDTOResponse} from "../models/eventModels/MusicSheetDTO";


@Injectable({
  providedIn: 'root'
})
export class ExternalMusicianService{
  public apikey = sessionStorage.getItem('Authorization')
  constructor(
    private rest: RestService,
    private encryptionService: EncryptionService,
    private http: HttpClient
  ) { }


  createMusician(musician:ExternalMusicianModel){
    return this.rest.post<ExternalMusicianModel,ExternalMusicianResponse>('http://localhost:8080/ExternalMusician/create',musician)
  }

  createMusicSheet(ms:MusicSheetDTO){
    return this.rest.post<MusicSheetDTO,MusicSheetDTOResponse>('http://localhost:8080/ExternalMusician/create',ms)
  }
  listExternalMusician(idEvent: number){
    return this.rest.get<ExternalMusicianResponse[]>('http://localhost:8080/ExternalMusician/findByCalendar/'+ idEvent)
  }

  deleteExternalMusician(idMusician:number){
    return this.rest.delete<ResponseStringModel>('http://localhost:8080/ExternalMusician/'+idMusician)
  }
}
