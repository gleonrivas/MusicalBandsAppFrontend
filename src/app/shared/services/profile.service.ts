import { Injectable } from '@angular/core';
import {RestService} from "./rest.service";
import {UserType} from "../models/userType.model";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private rest:RestService) { }

  getUserData(){
    return this.rest.get<UserType>('http://localhost:8080/user/profile')
  }
  postUserData(){
    return this.rest.get<UserType>('http://localhost:8080/user/editProfile')
  }

}
