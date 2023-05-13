import { Component } from '@angular/core';
import {SquadCreateService} from "../squad-create/service/squad-create.service";
import {newMaterial} from "../../../shared/models/newMaterial";
import {BorrowService} from "./service/borrow.service";
import {formatDate} from "@angular/common";
import {GeneralService} from "../../../shared/services/general.service";

@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.component.html',
  styleUrls: ['./borrow.component.css']
})
export class BorrowComponent {
  constructor(private borrowService: BorrowService, private generalService: GeneralService) {}

  selectedValue: any;

  newMaterial: newMaterial = { name: '', type: 0, date: new Date(), idFormation: 0}

  isModalOpen = false;

  listaMateriales: any;

  materialEdit: any;
  ngOnInit(){
   this.checkMaterials();
  }

  checkMaterials(){
    const id = sessionStorage.getItem('idFormacionC');
    this.borrowService.getMaterial(id).subscribe((data: any)=> {
      this.listaMateriales = data
      console.log(data)
    })
  }


  async createMaterial(){
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
    await this.borrowService.sendNewMaterial(body);
    this.generalService.presentToast('Material creado', 'success')
    this.checkMaterials()
  }

  async deleteMaterial(id:any){
    await this.borrowService.deleteMaterial(id);
    this.checkMaterials();
  }
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  openEdit(material:any){
    this.materialEdit = material;
    console.log(this.materialEdit);
    this.setOpen(true);
  }
}
