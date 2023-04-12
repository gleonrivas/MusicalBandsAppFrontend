import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class GeneralService{

  constructor(private route: Router) {
  }
  logOut(){
    localStorage.clear;
    this.route.navigate(['/login']);
  }

}
