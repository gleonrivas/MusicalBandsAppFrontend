import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {EventService} from "../../../shared/services/event.service";
import {FormationService} from "../../../shared/services/formation.service";
import {GetMeService} from "../../../shared/services/get-me.service";
import {RepertoryService} from "../../../shared/services/repertory.service";
import {AbsenceService} from "../../../shared/services/absence.service";
import {MusicalPieceService} from "../../../shared/services/musical-piece.service";
import {ToastController} from "@ionic/angular";
import {ExternalMusicianService} from "../../../shared/services/externalMusician.service";
import {FormationType} from "../../../shared/models/formationType.model";
import {EnumFormationType} from "../../../shared/models/Enum/EnumFormationType";
import {EventResponse} from "../../../shared/models/eventModels/eventResponse";
import {TreasuryService} from "../../../shared/services/treasury.service";
import {PayLowModel} from "../../../shared/models/payLow.model";
import {ExternalMusicianTreasury} from "../../../shared/models/externalMusician.model";
import {Color} from "@ionic/core";
import {AlertController} from '@ionic/angular';
import {PayFormation} from "../../../shared/models/payFormation";
import {Treasury} from "../../../shared/models/treasury";
import {UserFormation} from "../../../shared/models/UserFormation";
import {getSpecialFromRoles} from "./get-special-role.pipe";
import {RoleService} from "../../../shared/services/role.service";
import {FormationUserRole} from "../../../shared/models/formationUserRole";

@Component({
  selector: 'app-treasury',
  templateUrl: './treasury.component.html',
  styleUrls: ['./treasury.component.css']
})
export class TreasuryComponent {
  constructor(private readonly router: ActivatedRoute,
              private readonly location: Location,
              private readonly eventService: EventService,
              private readonly formationService: FormationService,
              private readonly treasuryService: TreasuryService,
              private readonly roleService: RoleService,
              private toastController: ToastController,
              private alertController: AlertController,
              private getMeService: GetMeService,
              private readonly route: Router) {

  }

  public id_treasury: number = -1;
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
  }
  public eventList: EventResponse[] = []

  public musicianList: ExternalMusicianTreasury[] = []

  public payLow: PayLowModel = {
    formationId: -1,
    userId: 0
  }

  public openedInfoSeason = false;

  public payFormation: PayFormation = {
    payDay: new Date(),
    inAccount: 0,
    totalPaid: 0,
    usersPaid: []
  }
  public treasuryList: Treasury[] = []
  public lastTreasury: Treasury = {
    id: -1,
    active: true,
    amount: 0,
    formation: {},
    receiveMoneyDate: new Date()
  };
  openedTransactions: boolean = false;
  openedDeleteMusician = false;
  musicians: UserFormation[] = [];
  notSpecialMusicians: UserFormation[] = [];
  openedAddRolMusician = false;

  createUserFormationRol: FormationUserRole = {
    formationId: -1,
    userId: -1,
    type: ""
  };
  isLoading = true;
  hasPermission = false;

  ngOnInit() {
    this.router.paramMap.subscribe((value) => {
      const id = value.get('id_formation');
      if (id !== null) {
        this.id_formation = parseInt(id);
        this.createUserFormationRol.formationId = this.id_formation;
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
          this.getExternalMusicians();
          this.getAllMoney(this.payLow);


        }
      })
    });
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

  getExternalMusicians() {
    return new Promise((resolve, reject) => {
      this.treasuryService.getAllExternalMusicianByFormation(this.payLow).subscribe({
        next: (data) => {
          this.musicianList = data
          resolve(data)
        },
        error: reject
      })
    })
  }

  getAllMoney(payLow: PayLowModel) {
    return new Promise((resolve, reject) => {
      this.treasuryService.getAllMoney(this.payLow).subscribe({
        next: (data) => {
          resolve(data)
          this.lastTreasury = data[data.length - 1];
          this.treasuryList = data.reverse();
        },
        error: reject
      })
    })
  }

  chargeEvent(eventId: number) {
    this.treasuryService.chargeEvent(eventId).subscribe({
      next: () => {
        this.getEventsByFormation().then(() => {
          this.presentToast("Se ha cobrado el evento correctamente", "success")
        }).catch(() => {
          this.presentToast("No se ha cobrado el evento. Intentelo más tarde.", "danger")
        })
      },
      error: () => this.presentToast("No se ha cobrado el evento. Intentelo más tarde.", "danger")
    })
  }

  payMusician(idMusician: number) {
    this.treasuryService.payMusician(idMusician).subscribe({
      next: () => {
        this.getExternalMusicians().then(() => {
          this.presentToast("Se ha pagado al músico correctamente", "success")
        }).catch(() => {
          this.presentToast("No se ha pagado al músico. Intentelo más tarde.", "danger")
        });
      },
      error: () => this.presentToast("No se ha pagado al músico. Intentelo más tarde.", "danger")
    });
  }

  async presentToast(message: string, color: Color) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      color: color
    });
    await toast.present();
  }

  async closeSeason() {
    const alert = await this.alertController.create({
      header: 'Confirmar cerrar temporada',
      message: '¿Estás seguro de continuar?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',

          handler: () => {

          }
        }, {
          text: 'Sí',
          cssClass: 'yes',
          handler: () => {
            this.closeSeasonHandler();
          }
        }
      ]
    });

    await alert.present();
  }

  closeSeasonHandler() {
    this.treasuryService.closeSeason(this.payLow).subscribe(({
      next: (data) => {
        this.payFormation = data;
        this.openedInfoSeason = true;
      }
    }))

  }

  closeSeasonModal() {
    this.openedInfoSeason = false;
  }

  downloadPdf() {
    this.treasuryService.downloadPdfSeason(this.payLow).subscribe({
      next: (response) => {
        const contentDisposition = response.headers.get('content-disposition');
        const filenameMatch = contentDisposition?.match(/filename="(.+)"/);
        const filename = filenameMatch ? filenameMatch[1] : 'documento.pdf';

        // Convertir el array de bytes en un archivo PDF
        if (response.body !== null) {
          this.convertBytesToPDF(response.body, filename);
        }

      }
    })
  }

  convertBytesToPDF(bytes: ArrayBuffer, filename: string) {
    const blob = new Blob([bytes], {type: 'application/pdf'});
    const url = URL.createObjectURL(blob);

    // Crear un enlace para descargar el archivo PDF
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;

    // Simular un clic en el enlace para iniciar la descarga
    link.click();

    // Liberar el objeto URL creado
    URL.revokeObjectURL(url);
  }

  getUsersFormation() {
    return new Promise((resolve, reject) => {

      this.formationService.getUsersByFormation(this.id_formation).subscribe({
        next: (data) => {
          this.musicians = data;
          this.notSpecialMusicians = data.filter(user => !getSpecialFromRoles(user.roleDTOList));
          resolve(data);
        },
        error: reject
      });
    })
  }

  viewTransactions() {
    this.openedTransactions = true;
  }

  closeTransactions() {
    this.openedTransactions = false;
  }

  deleteMusician(musician: UserFormation) {
    const specialRoles = [
      "PRESIDENT",
      "OWNER",
      "TREASURER",
      "ADMINISTRATOR",
      "ARCHIVIST",
      "ASSISTANCE_CONTROL"
    ]
    const specialRole = musician.roleDTOList.find(role => {
      const type = role.type;
      return specialRoles.includes(type);
    })

    this.payLow.userId = musician.id;
    if (specialRole) {
      this.createUserFormationRol.type = specialRole.type;
      this.openedAddRolMusician = true;
    } else {
      this.deleteUserFormFormationConfirm()
    }

  }

  openDeleteMusician() {
    this.getUsersFormation().then(() => {
      this.openedDeleteMusician = true;
    });
  }

  closeDeleteMusician() {
    this.openedDeleteMusician = false;
  }

  closeAddRolMusician() {
    this.openedAddRolMusician = false;
  }

  onSelectAddUserRol($event: any) {
    const id = $event.detail.value;
    if(id) {
      this.createUserFormationRol.userId = parseInt(id);
    }
  }

  createRoleUser() {
    if (this.createUserFormationRol.userId === -1) {
      this.presentToast("No ha seleccionado ningun usuario.", "danger");
      return;
    }
    this.roleService.createRole(this.createUserFormationRol).subscribe({
      next: () => {
        this.presentToast("Se han asignado los roles correctamente", "success");
        this.openedAddRolMusician = false;
        this.openedDeleteMusician = false;
        this.resetCreateUserRoleFormation()
        this.deleteUserfromFormation();
      },
      error: () => this.presentToast("Ha ocurrido un error inesperado. Inténtelo más tarde", "danger")
    });
  }

  resetCreateUserRoleFormation() {
    this.createUserFormationRol = {
      formationId: -1,
      userId: -1,
      type: ""
    };
  }

  deleteUserfromFormation() {
    this.treasuryService.deleteUserFromFormation(this.payLow).then(() => {
      this.presentToast("Se ha dado de baja al usuario", "success");
    }).catch(() => {
      this.presentToast("Ha ocurrido un error inesperado al dar de baja al usuario. Inténtelo más tarde", "danger")
    })
  }

  async deleteUserFormFormationConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirmar baja',
      message: '¿Está seguro?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',

          handler: () => {

          }
        }, {
          text: 'Sí',
          cssClass: 'yes',
          handler: () => {
            this.deleteUserfromFormation();
            this.openedDeleteMusician = false;
          }
        }
      ]
    });

    await alert.present();
  }

  setHasPermission() {
    const user = this.musicians.find(user => user.id === this.getMeService.id);
    if (user != null) {
      const hasTreasuryRole = user.roleDTOList.find(role => role.type === "TREASURER");
      if (hasTreasuryRole != null) {
        this.hasPermission = true;
      }
    }
    this.isLoading = false;
  }
}
