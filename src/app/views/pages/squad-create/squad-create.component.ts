import { Component } from '@angular/core';
import { EnumFormationType } from "../../../shared/models/Enum/EnumFormationType";
import {Register} from "../../../shared/models/register.model";
import {newSquad} from "../../../shared/models/newSquad.model";
import {RegisterService} from "../registro/service/register.service";
import {SquadCreateService} from "./service/squad-create.service";
import {Router} from "@angular/router";
import {ToastController} from "@ionic/angular";
import {GeneralService} from "../../../shared/services/general.service";

@Component({
  selector: 'app-squad-create',
  templateUrl: './squad-create.component.html',
  providers: [SquadCreateService],
  styleUrls: ['./squad-create.component.css']
})


export class SquadCreateComponent {

  constructor(private squadCreateService: SquadCreateService, private router: Router, private generalService: GeneralService) {}

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
        'fundationDate':this.newSquad.date + 'T04:20:00',
        'logo': this.newSquad.logo
      };
    const isEmpty = Object.values(body).some(value => value === '');
    if (isEmpty){
      this.generalService.presentToast('Debes rellenar todos los campos.', 'danger')
    }
    else {
      this.squadCreateService.sendNewSquad(body);
      this.generalService.presentToast('¡Formación creada!', 'success')
      this.router.navigate(['/home'])
    }
  }

}
