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
              private toastController: ToastController,
              private alertController: AlertController,
              private readonly route: Router) {

  }

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


  ngOnInit() {
    this.router.paramMap.subscribe((value) => {
      const id = value.get('id_formation');
      if (id !== null) {
        this.id_formation = parseInt(id);
        this.payLow.formationId = this.id_formation
      }


      this.formationService.getFormationById(this.id_formation).subscribe((data) => {
        this.formation = data


      })

      this.getEventsByFormation();
      this.getExternalMusicians();

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

          }
        }
      ]
    });

    await alert.present();
  }


}
