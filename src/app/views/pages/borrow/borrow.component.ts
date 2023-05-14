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

  selectedMaterialName: any;
  selectedMateriaType: any;

  selectedMaterialId: any;

  selectedValue: any;

  editMaterial: newMaterial = { name: '', type: 0, date: new Date(), idFormation: 0}

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
    const formatedDate = this.borrowService.createDate();
    const body =
      {"transferredMaterial" : this.newMaterial.name,
        "materialType" : this.newMaterial.type,
        "fullDate" : formatedDate,
        "idFormation" : sessionStorage.getItem('idFormacionC')
      };
    const isEmpty = this.generalService.emptyChecker(body);
    if (isEmpty){
      this.generalService.presentToast('Debes rellenar todos los campos.', 'danger')
    }
    else {
      await this.borrowService.sendNewMaterial(body);
      this.generalService.presentToast('Material creado', 'success')
      this.checkMaterials()
    }
  }

  async deleteMaterial(id:any){
    await this.borrowService.deleteMaterial(id);
    this.checkMaterials();
  }
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  openEdit(material:any){
    console.log(material)
    this.selectedMaterialName = material.transferredMaterial;
    if (material.materialType === 0){
      this.selectedMateriaType = 'Uniforme'
    }
    if (material.materialType === 1){
      this.selectedMateriaType = 'Instrumento'
    }
    this.setOpen(true);
  }

  async editerMaterial(){
    const formatedDate = this.borrowService.createDate();
    const body =
      {"transferredMaterial" : this.editMaterial.name,
        "materialType" : this.editMaterial.type,
        "fullDate" : formatedDate,
        "idFormation" : sessionStorage.getItem('idFormacionC')
      };
    await this.borrowService.editMaterial(body);
    this.generalService.presentToast('Material editado', 'success')
    this.checkMaterials()
  }

}
