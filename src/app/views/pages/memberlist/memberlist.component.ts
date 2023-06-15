import { Component } from '@angular/core';
import {GetMeService} from "../../../shared/services/get-me.service";
import {ActivatedRoute} from "@angular/router";
import {EventService} from "../../../shared/services/event.service";
import {FormationService} from "../../../shared/services/formation.service";
import {FormationType} from "../../../shared/models/formationType.model";
import {EnumFormationType} from "../../../shared/models/Enum/EnumFormationType";
import {EventResponse} from "../../../shared/models/eventModels/eventResponse";
import {UserFormation} from "../../../shared/models/UserFormation";
import {PayLowModel} from "../../../shared/models/payLow.model";
import {RoleDTO} from "../../../shared/models/roleDTO";

@Component({
  selector: 'app-memberlist',
  templateUrl: './memberlist.component.html',
  styleUrls: ['./memberlist.component.css']
})
export class MemberlistComponent {

  constructor(
    private getMeService: GetMeService,
    private readonly router: ActivatedRoute,
    private readonly eventService: EventService,
    private readonly formationService: FormationService,
  ) {
  }

  public isLoading = true;
  public id_formation: number = -1;
  public formation: FormationType = {
    id: -1,
    active: true,
    designation: "",
    fundationDate: "",
    foundationYear: "",
    logo: "",
    name: "",
    type: EnumFormationType.BANDS_OF_MUSIC,
    origin: "",
  };


  public eventList: EventResponse[] = []
  musicians: UserFormation[] = [];
  hasPermission = false;
  public payLow: PayLowModel = {
    formationId: -1,
    userId: 0
  }

  ngOnInit() {
    this.router.paramMap.subscribe((value) => {
      const id = value.get('id_formation');


      if (id !== null) {
        this.id_formation = parseInt(id);
        this.getUsersFormation().then(() => {
          this.setHasPermission();
        })

      }

      this.formationService.getFormationById(this.id_formation).subscribe({
        next: (data) => {
          this.formation = data;
          if (this.formation.id != null) {
            this.payLow.formationId = this.formation.id;
          }
          this.getEventsByFormation();
        }
      })
    })
  }

  getEventsByFormation() {
    return new Promise((resolve, reject) => {
      if (this.id_formation) {
        this.eventService.getEventsByIdFormation(this.payLow).subscribe({
          next: (data) => {
            this.eventList = data
            resolve(data);
          },
          error: reject,
        })
      }
    })
  }

  getUsersFormation() {
    return new Promise((resolve, reject) => {

      this.formationService.getUsersByFormation(this.id_formation).subscribe({
        next: (data) => {
          this.musicians = data;
          if (data != null) {
            for (let user of this.musicians) {
              user.roleDTOList = this.convertRole(user.roleDTOList)
            }
          }
          resolve(data);
        },
        error: reject
      });
    })
  }

  setHasPermission() {
    const user = this.musicians.find(user => user.id === this.getMeService.id);
    if (user != null) {
      const hasTreasuryRole = this.musicians.find(user => user.id === this.getMeService.id);
      if (hasTreasuryRole != null) {
        this.hasPermission = true;
      }
    }
    this.isLoading = false;
  }



  convertRole(roleList: RoleDTO[]) {
    let response: RoleDTO[] = [];

    for (let role of roleList) {

      if (role.type == "OWNER") {
        let finalRole: RoleDTO = {
          type: 'PROPIETARIO'
        };
        response.push(finalRole)
      }
      if (role.type == "PRESIDENT") {
        let finalRole: RoleDTO = {
          type: 'PRESIDENTE'
        };
        response.push(finalRole)
      }
      if (role.type == "DIRECTOR_MUSICAL") {
        let finalRole: RoleDTO = {
          type: 'DIRECTOR MUSICAL'
        };
        response.push(finalRole)
      }
      if (role.type == "VOCALIST") {
        let finalRole: RoleDTO = {
          type: 'VOCALISTA'
        };
        response.push(finalRole)
      }
      if (role.type == "TREASURER") {
        let finalRole: RoleDTO = {
          type: 'TESORERO'
        };
        response.push(finalRole)
      }
      if (role.type == "ADMINISTRATOR") {
        let finalRole: RoleDTO = {
          type: 'ADMINISTRADOR'
        };
        response.push(finalRole)
      }
      if (role.type == "ARCHIVIST") {
        let finalRole: RoleDTO = {
          type: 'ARCHIVERO'
        };
        response.push(finalRole)
      }
      if (role.type == "ASSISTANCE_CONTROL") {
        let finalRole: RoleDTO = {
          type: 'CONTROL DE ASISTENCIA'
        };
        response.push(finalRole)
      }
      if (role.type == "PERCUSSION") {
        let finalRole: RoleDTO = {
          type: 'PERCUSIONISTA'
        };
        response.push(finalRole)
      }
      if (role.type == "HAND_PERCUSSION_DE_MANO") {
        let finalRole: RoleDTO = {
          type: 'PERCUSIONISTA'
        };
        response.push(finalRole)
      }
      if (role.type == "KEYBOARD_INSTRUMENT") {
        let finalRole: RoleDTO = {
          type: 'TECLISTA'
        };
        response.push(finalRole)
      }
      if (role.type == "ELECTRONIC_INSTRUMENT") {
        let finalRole: RoleDTO = {
          type: 'INSTRUMENTO ELECTRÓNICO'
        };
        response.push(finalRole)
      }
      if (role.type == "PULSED_STRINGS") {
        let finalRole: RoleDTO = {
          type: 'CUERDA PULSADA'
        };
        response.push(finalRole)
      }
      if (role.type == "BOWED_STRINGS") {
        let finalRole: RoleDTO = {
          type: 'CUERDA'
        };
        response.push(finalRole)
      }
      if (role.type == "BRASS_INSTRUMENT") {
        let finalRole: RoleDTO = {
          type: 'VIENTO MADERA'
        };
        response.push(finalRole)
      }
      if (role.type == "COMPONENT") {
        let finalRole: RoleDTO = {
          type: 'COMPONENTE'
        };
        response.push(finalRole)
      }
    }
    return response
  }
}


