import { Component } from '@angular/core';
import { EnumFormationType } from "../../../shared/models/Enum/EnumFormationType";

@Component({
  selector: 'app-squad-create',
  templateUrl: './squad-create.component.html',
  styleUrls: ['./squad-create.component.css']
})
export class SquadCreateComponent {

  constructor() {}

  enumKeys: any;
  ngOnInit(){
    this.enumKeys = Object.keys(EnumFormationType)
  }
}
