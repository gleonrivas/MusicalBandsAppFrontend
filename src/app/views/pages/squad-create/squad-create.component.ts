import { Component } from '@angular/core';
import { EnumFormationType } from "../../../shared/models/Enum/EnumFormationType";
import {Register} from "../../../shared/models/register.model";
import {newSquad} from "../../../shared/models/newSquad.model";
import {RegisterService} from "../registro/service/register.service";
import {SquadCreateService} from "./service/squad-create.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-squad-create',
  templateUrl: './squad-create.component.html',
  providers: [SquadCreateService],
  styleUrls: ['./squad-create.component.css']
})


export class SquadCreateComponent {

  constructor(private squadCreateService: SquadCreateService, private router: Router) {}

  selectedValue: any;

  newSquad: newSquad = { name: '', type: '', location: '', number: 0, date: new Date(), logo: ''}
  enumKeys: any;
  ngOnInit(){
    const value = EnumFormationType[this.selectedValue];
  }
  createSquad(){
    const body =
      {'id_user': 2,
        'name':this.newSquad.name,
        'designation':'musical',
        'type':this.newSquad.type,
        'fundationDate':this.newSquad.date,
        'logo': this.newSquad.logo
      };
    console.log(body)
    console.log(this.newSquad.date)
    this.squadCreateService.sendNewSquad(body);
    this.router.navigate(['/home'])
  }
}
