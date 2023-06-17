import {Injectable} from "@angular/core";
import {RestService} from "./rest.service";
import {EncryptionService} from "./encryption.service";
import {HttpClient} from "@angular/common/http";
import {MusicSheetDTO, MusicSheetDTOResponse} from "../models/eventModels/MusicSheetDTO";


@Injectable({
  providedIn: 'root'
})
export class MusicSheetService{
  public apikey = sessionStorage.getItem('Authorization')
  constructor(
    private rest: RestService,
    private encryptionService: EncryptionService,
    private http: HttpClient
  ) { }

  createMusicSheet(ms:MusicSheetDTO){
    return this.rest.post<MusicSheetDTO,MusicSheetDTOResponse>('http://localhost:8080/ms/create',ms)
  }

  listMs(f: number | undefined, u: number | undefined){
    return this.rest.get<MusicSheetDTO>('http://localhost:8080/ms/listMs/'+ f + "/" + u)
  }

}
