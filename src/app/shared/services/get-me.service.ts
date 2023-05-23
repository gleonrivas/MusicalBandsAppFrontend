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
      return jwtDecode<UserInfo>(token)
    }
    return null;
  }

  public get id(): number {
    const id = this.decodeToken()?.id;

    return id || -1;
  }

}
