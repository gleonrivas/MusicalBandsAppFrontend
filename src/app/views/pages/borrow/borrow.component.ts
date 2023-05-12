import { Component } from '@angular/core';
import {SquadCreateService} from "../squad-create/service/squad-create.service";
import {newMaterial} from "../../../shared/models/newMaterial";
import {BorrowService} from "./service/borrow.service";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.component.html',
  styleUrls: ['./borrow.component.css']
})
export class BorrowComponent {
  constructor(private borrowService: BorrowService) {}

  selectedValue: any;

  newMaterial: newMaterial = { name: '', type: 0, date: new Date(), idFormation: 0}

  createMaterial(){
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const formatedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    const body =
      {"transferredMaterial" : this.newMaterial.name,
        "materialType" : this.newMaterial.type,
        "fullDate" : formatedDate,
        "idFormation" : sessionStorage.getItem('idFormacionC')
      };
    console.log(body)
    this.borrowService.sendNewMaterial(body);
  }
}
