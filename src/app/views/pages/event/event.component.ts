import {Component} from '@angular/core';
import {EventResponse} from "../../../shared/models/eventModels/eventResponse";
import {ActivatedRoute, Router} from "@angular/router";
import {EventService} from "../../../shared/services/event.service";
import {FormationType} from "../../../shared/models/formationType.model";
import {EnumFormationType} from "../../../shared/models/Enum/EnumFormationType";
import {UserFormation} from "../../../shared/models/UserFormation";
import {FormationService} from "../../../shared/services/formation.service";
import {UserInfo} from "../../../shared/models/user-info";
import {GetMeService} from "../../../shared/services/get-me.service";
import {RepertoryType} from "../../../shared/models/repertoryType.model";
import {RepertoryService} from "../../../shared/services/repertory.service";
import {AbscenceModel} from "../../../shared/models/abscence.model";
import {AbsenceService} from "../../../shared/services/absence.service";
import {MusicalPieceType} from "../../../shared/models/musicalPieceType.model";
import {MusicalPieceService} from "../../../shared/services/musical-piece.service";
import {ToastController} from "@ionic/angular";
import {HttpErrorResponse} from "@angular/common/http";


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {
  constructor(private readonly router: ActivatedRoute,
              private readonly eventService: EventService,
              private readonly formationService: FormationService,
              private readonly getMeService: GetMeService,
              private readonly repertoryService: RepertoryService,
              private readonly absenceService: AbsenceService,
              private readonly musicalPieceService: MusicalPieceService,
              private toastController: ToastController,
              private readonly route: Router) {
  }

  public id_event: number = -1;
  public event: EventResponse = {
    id: -1,
    place: "",
    date: new Date(),
    title: "",
    description: "",
    type: "",
    paid: true,
    amount: -1,
    penaltyPonderation: -1
  }

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
  public musicalPieceList: MusicalPieceType[]= []
  public day: number = -1;
  public formationId?: number = -1;
  public monthList: string[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Noviembre", "Diciembre"];
  public numberMonth: number = -1;
  public fecha: Date = new Date();
  public month: string = "";
  public userList: UserFormation[] = [];
  public idUser?: string | null = "";
  public isToday: boolean = true;
  public rolList: string[] = [];
  public isUserChecked: number[] = [];
  public isSaved: boolean=false;



  public userInfo: UserInfo = {
    id: -1,
    sub: "",
    iat: -1,
    exp: -1,
  }

  public repertoryByFormation: RepertoryType[] = []

  public repertoryByCalendar: RepertoryType = {
    id: -1,
    active: true,
    name: "",
    description: "",
    idFormation: -1
  }

  private absenceList: AbscenceModel = {
    calendarEventId: '',
    listOfUserId: []
  }
  async presentToast(message:string, color:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      color: color
    });
    await toast.present();
  }

  ngOnInit() {


    const id = this.getMeService.id;


    this.router.paramMap.subscribe((value) => {
      const id = value.get('id_event');
      if (id !== null) {
        this.id_event = parseInt(id);
      }
    });

    this.eventService.getEventById(this.id_event).subscribe((data) => {
      this.event = data;
      this.fecha = this.event.date;
      let fechastring = this.fecha.toString();
      let cadena: string = fechastring.slice(5, -3);
      this.numberMonth = parseInt(cadena);
      this.month = this.monthList[this.numberMonth - 1];
      this.day = Math.abs(parseInt(fechastring.slice(7)));
      let todayDate: Date = new Date();
      if (this.fecha.getDate() == todayDate.getDate()) {
        this.isToday = false;
      }

    })
    this.eventService.getFormationByIdCalendar(this.id_event).subscribe((data) => {
      this.formation = data;
      this.formationService.getUsersByFormation(this.formation.id).subscribe((data) => {
        this.userList = data;
        for (let user of this.userList) {
          if (user.id == id) {
            for (let rol of user.roleDTOList) {
              this.rolList.push(rol.type)
            }
          }
        }

        if (this.formation.id) {
          this.repertoryService.getRepertoriesByIdFormation(this.formation.id).subscribe((data) => {
            this.repertoryByFormation = data;
            console.log( this.repertoryByFormation)
          })
          this.repertoryService.getRepertoryByCalendar(this.id_event).subscribe((data) => {
            this.repertoryByCalendar = data;
            if(this.repertoryByCalendar.id){
              this.musicalPieceService.getMusicalPieceByRepertoryId(this.repertoryByCalendar.id).subscribe((data)=>{

                this.musicalPieceList=data;
              })
            }
          })

        }

      })


    })


  }

  abscenceRegistrer(event: any, userId: number) {

    if (event.target.checked == false) {
      this.isUserChecked.push(userId)

    }


  }

  saveAbscence() {
    this.absenceList.calendarEventId = this.id_event.toString();
    let list = Array.from(new Set(this.isUserChecked));
    for (let idUser of this.userList) {
      if (!list.includes(idUser.id)) {
        this.absenceList.listOfUserId.push(idUser.id.toString())
      }
    }
    this.absenceService.postAbsenceList(this.absenceList).subscribe(response=>{
      this.isSaved=true;
      this.presentToast('Se han guardado los datos correctamente', 'success')// Accede al status del error
    },(error: HttpErrorResponse) => {

    })
  }
  saveRepertory(){

  }

}
