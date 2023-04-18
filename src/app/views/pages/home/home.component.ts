import {Component, OnInit} from '@angular/core';
import {FormationService} from "../../../shared/services/formation.service";
import {FormationModel} from "../../../shared/models/formation.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  public userFormations:FormationModel[]=[]
  public auth = localStorage.getItem('Authorization');
  public finder: string = '';
  public searchedFormations:FormationModel[]=[];

  constructor(
    private formationService:FormationService,
    private route:Router,
    ) {
  }



  ngOnInit(){
    this.formationService.getUserFormations().subscribe((data)=>{
      this.userFormations = data;
      console.log(data);
    });
    console.log(localStorage.getItem('Authorization'))
    this.formationService.getFormation()
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
        this.searchedFormations.push({
          id:id,
          active:active,
          designation:designation,
          foundationYear:foundationYear,
          logo:logo,
          name:name,
          type:type
        });
      });
      if (!this.finder) {
        this.searchedFormations = [];
      }
    })
  }


  viewFormation(formation:FormationModel){
    this.formationService.setFormation(formation);
    this.route.navigateByUrl('/formacion');
  }


}
