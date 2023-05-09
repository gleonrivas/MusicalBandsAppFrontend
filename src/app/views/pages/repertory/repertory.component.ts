import {Component, OnInit} from '@angular/core';
import {RepertoryService} from "../../../shared/services/repertory.service";
import {FormationService} from "../../../shared/services/formation.service";
import {Router} from "@angular/router";
import {RepertoryType} from "../../../shared/models/repertoryType.model";

@Component({
  selector: 'app-repertory',
  templateUrl: './repertory.component.html',
  styleUrls: ['./repertory.component.css']
})
export class RepertoryComponent implements OnInit{

  isModalOpen = false;

  public repertories:RepertoryType[]=[]


  constructor(
    private repertoryService:RepertoryService,
    private formationService:FormationService,
  ) {
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  ngOnInit(){
    this.repertoryService.getRepertoryByIdFormation(parseInt(sessionStorage.getItem('idFormation')!)).subscribe((data) => {
      this.repertories = data
    });
    console.log(this.repertories)

  }



}
