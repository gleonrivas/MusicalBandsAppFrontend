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

  searchBar(){
    const search:any = document.getElementById('search');
    if (search.style.display === 'none'){
      search.style.display = 'block'
    }
    else {
      search.style.display = 'none';
    }
  }

}
