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
  postProfileData(user:UserType){
    return this.rest.post('http://localhost:8080/user/editProfile/' + user.fake, user)
  }

  postPasswordData(password:Object){
    return this.rest.post('http://localhost:8080/user/changePassword', password)
  }

}
