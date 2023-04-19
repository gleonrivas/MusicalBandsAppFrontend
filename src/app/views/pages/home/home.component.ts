import {Component, OnInit} from '@angular/core';
import {FormationService} from "../../../shared/services/formation.service";
import {FormationType} from "../../../shared/models/formationType.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  public userFormations:FormationType[]=[]
  public auth = localStorage.getItem('Authorization');
  public finder: string = '';
  public searchedFormations: FormationType[] | null | undefined;

  constructor(
    private formationService:FormationService,
    private route:Router,
    ) {
  }



  ngOnInit(){
    this.formationService.getUserFormationsByOwner().subscribe((data) => {
      this.userFormations = [];
      data.forEach((result: any) => {
        const {id, active, designation, foundationYear, logo, name, type} = result;
        this.userFormations.push({
          id: id,
          active: active,
          designation: designation,
          foundationYear: foundationYear,
          logo: logo,
          name: name,
          type: type,
          origin: 'Eres propietari@'
        });
      });
    });
    this.formationService.getUserFormationsByUser().subscribe((data) => {
      this.userFormations = [];
      data.forEach((result: any) => {
        const {id, active, designation, foundationYear, logo, name, type} = result;
        this.userFormations.push({
          id: id,
          active: active,
          designation: designation,
          foundationYear: foundationYear,
          logo: logo,
          name: name,
          type: type,
          origin: 'Eres participante'
        });
      });
    });
  }

  searchFormation() {
    this.searchedFormations = [];
    if (!this.finder) {
      return;
    }

    this.formationService.formationFinder(this.finder).subscribe((data) => {
      this.searchedFormations = [];
      data.forEach((result: any) => {
        const {id, active, designation, foundationYear, logo, name, type} = result;
        this.searchedFormations!.push({
          id:id,
          active:active,
          designation:designation,
          foundationYear:foundationYear,
          logo:logo,
          name:name,
          type:type,
          origin:'Propietario'
        });
      });
      if (!this.finder) {
        this.searchedFormations = [];
      }
    });
  }


  viewFormation(formation:FormationType){
    this.formationService.setFormation(formation);
    this.route.navigateByUrl('/formacion');
  }


}
