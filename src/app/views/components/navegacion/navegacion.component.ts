import { Component } from '@angular/core';
import {GeneralService} from "../../../shared/services/general.service";

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent {

  constructor(private generalService: GeneralService){};
  logout(){
    this.generalService.logOut();
  }

  searchNav = false

  searchBar(){
    const search:any = document.getElementById('search');
    if (this.searchNav === false){
      search.style.display = 'block'
      this.searchNav = true;
    }
    else {
      search.style.display = 'none';
      this.searchNav = false;
    }
  }

}
