import {Component, OnInit} from '@angular/core';
import {ProfileService} from "../../../shared/services/profile.service";

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent{

  oldpasswd?:string
  newpasswd1?:string
  newPasswd2?:string

  constructor(
    private profileService:ProfileService,
  ) {
  }
  modifyPassword() {

    let requestBody = {
      oldPassword :this.oldpasswd,
      newPassword1 :this.newpasswd1,
      newPassword2:this.newPasswd2
    }

    this.profileService.postPasswordData(requestBody).subscribe((data) =>{
      console.log(data)
    })

  }

}
