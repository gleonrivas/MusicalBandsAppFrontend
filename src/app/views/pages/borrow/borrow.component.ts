import { Component } from '@angular/core';
import {SquadCreateService} from "../squad-create/service/squad-create.service";
import {newMaterial} from "../../../shared/models/newMaterial";
import {BorrowService} from "./service/borrow.service";
import {formatDate} from "@angular/common";
import {GeneralService} from "../../../shared/services/general.service";
import {newBorrow} from "../../../shared/models/newBorrow.model";

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
  newBorrow: newBorrow = { materialId: 0, userId: 0}

  isModalOpen = false;

  listaMateriales: any;
  listaUsuarios: any;

  materialEdit: any;

  usersList: any;
  ngOnInit(){
   this.checkMaterials();
   this.borrowService.getUsers().subscribe((data: any)=> {
     this.usersList = data
     console.log(data)
   })
    this.listaUsuarios = []
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
    const name = this.newMaterial.name;
    const materialType = this.newMaterial.type;
    const body = this.borrowService.createBody(name, materialType);

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
    this.generalService.presentToast('Material borrado', 'success')
    this.checkMaterials();
  }
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  openEdit(material:any){
    sessionStorage.setItem('idMaterial', material.id)
    this.editMaterial.name = material.transferredMaterial;
    if (material.materialType === 0){
      this.selectedMateriaType = 'Uniforme'
      this.editMaterial.type = 0
    }
    if (material.materialType === 1){
      this.selectedMateriaType = 'Instrumento'
      this.editMaterial.type = 1
    }
    this.setOpen(true);
  }

  async editerMaterial(){
    const formatedDate = this.borrowService.createDate()

    const body =
      {"id": sessionStorage.getItem('idMaterial'),
        "transferredMaterial" : this.editMaterial.name,
        "materialType" : this.editMaterial.type,
        "fullDate" : formatedDate,
        "idFormation" : sessionStorage.getItem('idFormacionC')
      };
    console.log(body)
    await this.borrowService.editMaterial(body);
    this.generalService.presentToast('Material editado', 'success')
    this.checkMaterials()
  }

  checkBorrowedMaterials(id:any){
    this.borrowService.getBorrowedUsers(id).subscribe((data: any)=> {
      this.listaUsuarios = data
      console.log(data)
    })
  }
  showPeople(event: any) {
    if (event.detail.value !== undefined){
      this.checkBorrowedMaterials(event.detail.value)
    }
  }
  async createBorrow(id:any){
    console.log(id)
    console.log(id, this.newBorrow.userId)
    await this.borrowService.createBorrowMaterial(id, this.newBorrow.userId);
    this.generalService.presentToast('Material prestado', 'success')
    this.checkBorrowedMaterials(id)
  }

  async deleteBorrow(materialid: any, userid: any){
    console.log(materialid, userid)
    await this.borrowService.deleteBorrowMaterial(materialid, userid)
    this.generalService.presentToast('Prestamo borrado', 'success')
    this.checkBorrowedMaterials(materialid)
  }

}
