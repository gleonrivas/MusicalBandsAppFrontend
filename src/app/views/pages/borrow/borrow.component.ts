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
    const body =
      {'transferredMateria':this.newMaterial.name,
        'materialType':this.newMaterial.type,
        'fullDate': formatDate(new Date(), 'yyyy/MM/dd', 'en'),
        'idFormation': 1
      };
    console.log(body)
    this.borrowService.sendNewMaterial(body);
  }
}
