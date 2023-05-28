import { Injectable } from '@angular/core';
import {RestService} from "./rest.service";
import {MusicalPieceType} from "../models/musicalPieceType.model";

@Injectable({
  providedIn: 'root'
})
export class MusicalPieceService {

  constructor(
    private rest:RestService,
  ) { }


  getMusicalPieceByRepertoryId(repertoryId:number){
    return this.rest.get<MusicalPieceType[]>('http://localhost:8080/musicalPiece/'+repertoryId)
  }

  createMusicalPiece(musicalPiece:MusicalPieceType){
    return this.rest.post('http://localhost:8080/musicalPiece/create', musicalPiece)
  }

  deleteMusicalPiece(musicalPieceId:number, repertoryId:number){
    return this.rest.delete('http://localhost:8080/musicalPiece/delete/'+ musicalPieceId +'/'+ repertoryId)
  }


}
