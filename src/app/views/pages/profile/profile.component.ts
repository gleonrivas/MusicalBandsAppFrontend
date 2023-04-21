import {Component, OnInit} from '@angular/core';
import {ProfileService} from "../../../shared/services/profile.service";
import {UserType} from "../../../shared/models/userType.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  constructor(private profileService:ProfileService) {
  }

  public profile!:UserType;

  ngOnInit() {

    this.profileService.getUserData().subscribe((data)=>{
      this.profile = data;
    })

  }

}
