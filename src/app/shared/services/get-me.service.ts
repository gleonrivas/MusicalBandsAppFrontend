import {Injectable} from '@angular/core';
import {AES, enc} from 'crypto-js';
import jwtDecode from "jwt-decode";
import {UserInfo} from "../models/user-info";

@Injectable({
  providedIn: 'root'
})
export class GetMeService {

  private decodeToken() {
    const token = sessionStorage.getItem("Authorization");

    if (token) {
      console.log(jwtDecode<UserInfo>(token))
      return jwtDecode<UserInfo>(token)
    }
    return null;
  }

  public get id(): number {
    const userInfo = this.decodeToken();
    if (userInfo != null) {
      return parseInt(userInfo.id.toString())
    }
    return -1;
  }

}
