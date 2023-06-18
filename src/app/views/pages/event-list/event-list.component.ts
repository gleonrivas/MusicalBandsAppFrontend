import {Component} from '@angular/core';
import {GetMeService} from "../../../shared/services/get-me.service";
import {FormationType} from "../../../shared/models/formationType.model";
import {EnumFormationType} from "../../../shared/models/Enum/EnumFormationType";
import {FormationService} from "../../../shared/services/formation.service";
import {getSpecialFromRoles} from "../treasury/get-special-role.pipe";
import {UserFormation} from "../../../shared/models/UserFormation";
import {ActivatedRoute} from "@angular/router";
import {EventResponse} from "../../../shared/models/eventModels/eventResponse";
import {EventService} from "../../../shared/services/event.service";
import {PayLowModel} from "../../../shared/models/payLow.model";
import {DatePipe} from "@angular/common";

type EventFormationType = 'PRACTICE' | 'CONCERT';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
  providers: [DatePipe]
})
export class EventListComponent {
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

  public type: EventFormationType = "CONCERT"
  public eventList: any;
  musicians: UserFormation[] = [];
  hasPermission = false;
  public payLow: PayLowModel = {
    formationId: -1,
    userId: 0
  }

  ngOnInit() {
    this.router.paramMap.subscribe((value) => {
      const id = value.get('id_formation');
      const type = value.get("type");

      if (type === "PRACTICE".toLowerCase()) {
        this.type = "PRACTICE"
      }

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
        this.eventService.getEvents(this.payLow.formationId).subscribe({
          next: (data) => {
            this.eventList = data
            // @ts-ignore
            this.eventList = this.eventList.filter(event => event.type === this.type);
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
}
