import {Component, OnInit} from '@angular/core';
import {HomeService} from "./service/home.service";
import {HttpHeaders, HttpParams} from "@angular/common/http";
import {FormationService} from "../../../shared/services/formation.service";
import {FormationModel} from "../../../shared/models/formation.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  public userFormations:FormationModel[]=[]
  public auth = localStorage.getItem('Authorization');

  constructor(private formationService:FormationService) {
  }

  ngOnInit(){
    this.formationService.getUserFormations().subscribe((data)=>{
      this.userFormations = data;
      console.log(data);
    });
    console.log(localStorage.getItem('Authorization'))

  }


}
