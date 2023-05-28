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
import {RoleDTO} from "../../../shared/models/roleDTO";
import {CalendarEventUpdateDTO} from "../../../shared/models/eventModels/calendarEventUpdateDTO";

import {ExternalMusicianService} from "../../../shared/services/externalMusician.service";
import {ExternalMusicianModel} from "../../../shared/models/externalMusician.model";


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
              private readonly externalMusicianService: ExternalMusicianService,
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
    amount: 0,
    penaltyPonderation: -1
  }

  public externalMusician:ExternalMusicianModel= {
    amount: -1,
    dni: "",
    name: "",
    surname: "",
    idCalendar: -1,
    bankAccount: "",
    email:"",
    phone: ""
  }
  public calendarUpdate:CalendarEventUpdateDTO = {
    idCalendarEvent: "",
    enumTypeActuation: "", //EnumTypeActuation
    title:"",
    place:"",
    paid:"", //boolean
    description: "",
    date: "", //LocalDate
    amount:"",  //Double
    penaltyPonderation: "", //Double
    idRepertory:"", //Integer
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
  public isModalOpen = false;
  public musicianExternanFormOpened = false;
  public isPast : boolean = false;



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
      if(this.fecha.getDate()>=todayDate.getDate()){
        this.isPast = true
      }else{
        this.isPast=false
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

        for(let user of this.userList){
         user.roleDTOList = this.convertRole(user.roleDTOList)
        }



        if (this.formation.id) {
          this.repertoryService.getRepertoriesByIdFormation(this.formation.id).subscribe((data) => {
            this.repertoryByFormation = data;
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

  convertRole(roleList: RoleDTO[]){
    let response:RoleDTO[]=[];

    for(let role of roleList){

      if(role.type=="OWNER"){
        let finalRole:RoleDTO = {
          type: 'PROPIETARIO'
        };
        response.push(finalRole)
      }
      if(role.type=="PRESIDENT"){
        let finalRole:RoleDTO = {
          type: 'PRESIDENTE'
        };
        response.push(finalRole)
      }
      if(role.type=="DIRECTOR_MUSICAL"){
        let finalRole:RoleDTO = {
          type: 'DIRECTOR MUSICAL'
        };
        response.push(finalRole)
      }
      if(role.type=="VOCALIST"){
        let finalRole:RoleDTO = {
          type: 'VOCALISTA'
        };
        response.push(finalRole)
      }
      if(role.type=="TREASURER"){
        let finalRole:RoleDTO = {
          type: 'TESORERO'
        };
        response.push(finalRole)
      }
      if(role.type=="ADMINISTRATOR"){
        let finalRole:RoleDTO = {
          type: 'ADMINISTRADOR'
        };
        response.push(finalRole)
      }
      if(role.type=="ARCHIVIST"){
        let finalRole:RoleDTO = {
          type: 'ARCHIVERO'
        };
        response.push(finalRole)
      }
      if(role.type=="ASSISTANCE_CONTROL"){
        let finalRole:RoleDTO = {
          type: 'CONTROL DE ASISTENCIA'
        };
        response.push(finalRole)
      }
      if(role.type=="PERCUSSION"){
        let finalRole:RoleDTO = {
          type: 'PERCUSIONISTA'
        };
        response.push(finalRole)
      }
      if(role.type=="HAND_PERCUSSION_DE_MANO"){
        let finalRole:RoleDTO = {
          type: 'PERCUSIONISTA'
        };
        response.push(finalRole)
      }
      if(role.type=="KEYBOARD_INSTRUMENT"){
        let finalRole:RoleDTO = {
          type: 'TECLISTA'
        };
        response.push(finalRole)
      }
      if(role.type=="ELECTRONIC_INSTRUMENT"){
        let finalRole:RoleDTO = {
          type: 'INSTRUMENTO ELECTRÓNICO'
        };
        response.push(finalRole)
      }
      if(role.type=="PULSED_STRINGS"){
        let finalRole:RoleDTO = {
          type: 'CUERDA PULSADA'
        };
        response.push(finalRole)
      }
      if(role.type=="BOWED_STRINGS"){
        let finalRole:RoleDTO = {
          type: 'CUERDA'
        };
        response.push(finalRole)
      }
      if(role.type=="BRASS_INSTRUMENT"){
        let finalRole:RoleDTO = {
          type: 'VIENTO MADERA'
        };
        response.push(finalRole)
      }
      if(role.type=="COMPONENT"){
        let finalRole:RoleDTO = {
          type: 'COMPONENTE'
        };
        response.push(finalRole)
      }
    }
    return response
  }



  deleteCalendar(calendarId:number){
    this.eventService.deleteCalendar(calendarId).subscribe(response=>{
      this.presentToast('Se han guardado los datos correctamente', 'success')// Accede al status del error
      if(response.response == "The event has already occurred, it is not possible to delete it."){
        this.presentToast('Un evento ya ocurrido no se puede borrar', 'danger')
      }
    },(error: HttpErrorResponse) => {
      if(error.error.message =="The event has already occurred, it is not possible to delete it."){
        this.presentToast('Un evento ya ocurrido no se puede borrar', 'danger')
      }
      if(error.message == "The event has already occurred, it is not possible to delete it."){
        this.presentToast('Un evento ya ocurrido no se puede borrar', 'danger')
      }else if(error.message == "You cannot delete events"){
        this.presentToast('Tu rol no te permite eliminar el evento', 'danger')
      }else{
        this.presentToast('No se ha podido borrar el evento', 'danger')
      }
      // Acceder a la respuesta del servidor en caso de error
      // if (error.error instanceof ErrorEvent) {
      //   // Error de cliente (ejemplo: error de red)
      //   if(error.error.message =="The event has already occurred, it is not possible to delete it."){
      //     this.presentToast('Un evento ya ocurrido no se puede borrar', 'danger')
      //   }
      //   console.log('Error de cliente:', error.error.message);
      // } else {
      //   // Error del servidor
      //   console.log('Error del servidor:', error.status);
      //   console.log('Respuesta del servidor:', error.error); // Aquí puedes acceder a la respuesta del servidor
      // }
    })
    this.route.navigate(['/home']);
  }
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  openEdit(calendar:EventResponse){
    sessionStorage.setItem('idCalendar', calendar.id.toString())

    this.setOpen(true);
  }
  setOpenExternalMusicianForm(isOpen: boolean) {
    this.musicianExternanFormOpened = isOpen;
  }
  openMusicalExternForm(){
    this.setOpenExternalMusicianForm(true)
  }
  async editerEvento(){
    console.log(this.event)
    let paid:string=""
    let repertoryId:string | null= ""
    if(this.event.paid == true){
      paid="1"
    }else{
      paid="0"
    }
    if(this.repertoryByCalendar.id){
      if(this.repertoryByCalendar.id == -1){
        repertoryId = ""
      }else {
        repertoryId = this.repertoryByCalendar.id.toString()
      }
    }


    this.calendarUpdate = {
      idCalendarEvent : this.event.id.toString(),
      enumTypeActuation:this.event.type,
      title:this.event.title,
      place:this.event.place,
      paid:paid,
      description:this.event.description,
      date:this.event.date.toString(),
      amount:this.event.amount.toString(),
      penaltyPonderation:this.event.penaltyPonderation.toString(),
      idRepertory: repertoryId
    }
    console.log(this.calendarUpdate)
    this.eventService.updateCalendar(this.calendarUpdate).subscribe(response=>{
      this.presentToast('Se han guardado los datos correctamente', 'success')// Accede al status del error
    },(error: HttpErrorResponse) => {
      if(error.message== 'No earlier date than the current date is possible' ){
        this.presentToast('No puede guardar un evento anterior a la fecha actual', 'danger')
      }else if (error.message== 'You cannot update events'){
        this.presentToast('No puedes editar este evento', 'danger')
      }else if( error.message =='Something wron' ){
        this.presentToast('No es posible guardar el evento en este momento', 'danger')
      }else{
        this.presentToast('No es posible guardar el evento en este momento', 'danger')
      }

    })
    this.route.navigate(['/event/',this.event.id]);
  }

  async createExternalMusician(){
    this.externalMusician.idCalendar= this.id_event;

    if(this.externalMusician.name){
      this.externalMusicianService.createMusician(this.externalMusician).subscribe(response=>{
        this.presentToast('El músico externo se ha creado correctamente', 'success')// Accede al status del error
      },(error: HttpErrorResponse) => {
        this.presentToast('No es posible crear músicos en este momento', 'danger')
      })
    }

    this.setOpenExternalMusicianForm(false)
    this.route.navigate(['/event/',this.event.id]);
  }



}
