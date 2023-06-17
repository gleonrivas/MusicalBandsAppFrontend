import {Component} from '@angular/core';
import {EventResponse} from "../../../shared/models/eventModels/eventResponse";
import {ActivatedRoute, Router} from "@angular/router";
import {EventService} from "../../../shared/services/event.service";
import {FormationType} from "../../../shared/models/formationType.model";
import {EnumFormationType} from "../../../shared/models/Enum/EnumFormationType";
import {UserFormation} from "../../../shared/models/UserFormation";
import {FormationService} from "../../../shared/services/formation.service";
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
import {ExternalMusicianModel, ExternalMusicianResponse} from "../../../shared/models/externalMusician.model";
import {Location} from "@angular/common";
import {MusicSheetDTO} from "../../../shared/models/eventModels/MusicSheetDTO";
import {MusicSheetService} from "../../../shared/services/musicSheet.service";


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {
  constructor(private readonly router: ActivatedRoute,
              private readonly location: Location,
              private readonly eventService: EventService,
              private readonly formationService: FormationService,
              private readonly getMeService: GetMeService,
              private readonly repertoryService: RepertoryService,
              private readonly absenceService: AbsenceService,
              private readonly musicalPieceService: MusicalPieceService,
              private readonly musicSheetService: MusicSheetService,
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

  public externalMusician: ExternalMusicianModel = {
    amount: 0,
    dni: "",
    name: "",
    surname: "",
    idCalendar: -1,
    bankAccount: "",
    email: "",
    phone: ""
  }
  public calendarUpdate: CalendarEventUpdateDTO = {
    idCalendarEvent: "",
    enumTypeActuation: "", //EnumTypeActuation
    title: "",
    place: "",
    paid: "", //boolean
    description: "",
    date: "", //LocalDate
    amount: "",  //Double
    penaltyPonderation: "", //Double
    idRepertory: "", //Integer
  }

  public musicSheet: MusicSheetDTO ={
    musicSheetPdf: "",
    formationId: -1, //Integer
    userId: -1
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
  public musicalPieceList: MusicalPieceType[] = []
  public musicSheetList: any = []
  public day: number = -1;
  public monthList: string[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Noviembre", "Diciembre"];
  public numberMonth: number = -1;
  public fecha: Date = new Date();
  public month: string = "";
  public userList: UserFormation[] = [];
  public isToday: boolean = false;
  public rolList: string[] = [];
  public isUserChecked: number[] = [];
  public isSaved: boolean = false;
  public isModalOpen = false;
  public musicianExternanFormOpened = false;
  public viewMusicianExternanFormOpened = false;
  public isPast: boolean = false;
  public time: string = '';
  public externalMusicianList: ExternalMusicianResponse[] = []
  public id: number = -1

  public idUser: number[] = []

  public isLoading = true;

  public isEditable = false;

  public isDeletable = false;
  public ms: string | ArrayBuffer | null = '';

  public idUserSelected = 0;

  public repertoryByFormation: RepertoryType[] = []

  public repertoryByCalendar: RepertoryType = {
    id: -1,
    active: true,
    name: "",
    description: "",
    idFormation: -1
  }
  public date: Date = new Date()

  private absenceList: AbscenceModel = {
    calendarEventId: '',
    listOfUserId: []
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      color: color
    });
    await toast.present();
  }

  ngOnInit() {

    this.id = this.getMeService.id;




    this.router.paramMap.subscribe((value) => {
      const id = value.get('id_event');
      if (id !== null) {
        this.id_event = parseInt(id);
      }
    });

    this.eventService.getEventById(this.id_event).subscribe((data) => {
      this.event = data;
      this.event.date = new Date(this.event.date);

      const day = this.event.date.getDate();
      const month = this.event.date.getMonth();
      const year = this.event.date.getFullYear();

      const nowDay = this.date.getDate();
      const nowMonth = this.date.getMonth();
      const nowYear = this.date.getFullYear();

      this.setEditable(this.event.date);
      if (nowDay === day && nowMonth === month && nowYear === year) {
        this.isToday = true;
      }


      this.fecha = this.event.date;
      let hours = `${this.event.date.getHours()}`;
      let minutes = `${this.event.date.getMinutes()}`;

      if (hours.length < 2) {
        hours = `0${hours}`;
      }

      if (minutes.length < 2) {
        minutes = `0${minutes}`;
      }

      this.time = `${hours}:${minutes}`

      let fechastring = this.fecha.toString();
      this.numberMonth = this.fecha.getMonth();
      this.month = this.monthList[this.numberMonth];
      this.day = Math.abs(parseInt(fechastring.slice(7)));

    })

    this.externalMusicianService.listExternalMusician(this.id_event).subscribe((data) => {
      this.externalMusicianList = data
    })

    this.eventService.getFormationByIdCalendar(this.id_event).subscribe((data) => {
      this.formation = data;
      this.formationService.getUsersByFormation(this.formation.id).subscribe((data) => {
        this.userList = data;
        for (let user of this.userList) {
          this.idUser.push(user.id)
          if (user.id == this.id) {
            for (let rol of user.roleDTOList) {
              this.rolList.push(rol.type)
            }
          }
        }

        this.musicSheetService.listMs(this.formation.id, this.id).subscribe((data)=> {
          this.musicSheetList = data
          console.log(this.musicSheetList);
        })


        for (let user of this.userList) {
          user.roleDTOList = this.convertRole(user.roleDTOList)
        }


        if (this.formation.id) {
          this.repertoryService.getRepertoriesByIdFormation(this.formation.id).subscribe((data) => {
            this.repertoryByFormation = data;
          })
          this.repertoryService.getRepertoryByCalendar(this.id_event).subscribe((data) => {
            this.repertoryByCalendar = data;
            if (this.repertoryByCalendar.id) {
              this.musicalPieceService.getMusicalPieceByRepertoryId(this.repertoryByCalendar.id).subscribe((data) => {

                this.musicalPieceList = data;
              })
            }
          })

        }

        this.isLoading = false;
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
    this.absenceService.postAbsenceList(this.absenceList).subscribe(response => {
      this.isSaved = true;
      this.presentToast('Se han guardado los datos correctamente', 'success')// Accede al status del error
    }, (responseError: HttpErrorResponse) => {
      const error = responseError.error;
      if (error.response == "There are already registered users") {
        this.presentToast('No puede vovler a pasar lista', 'danger')
      }
      if (error.response == "There are already registered users") {
        this.presentToast('No puedes volver a pasar lista', 'danger')
      } else if (error.response == "There is a user who does not belong to the formation") {
        this.presentToast('Hay usuarios que no pertenecen a esta formación', 'danger')
      } else if (error.response == "You can't register absences") {
        this.presentToast('Tu rol no te permite registar ausencias', 'danger')
      } else if (error.response == "The event is not today") {
        this.presentToast('No puede registrar una ausencia de un evento que no es hoy', 'danger')
      } else {
        this.presentToast('No se ha podido borrar el evento', 'danger')
      }

    })
  }

  saveRepertory() {

  }

  timeToString(date: Date) {
    let hours = date.getHours()
    let minutes = date.getMinutes()

    let time = date.toString()
    let response = time.split('T')[1]
    let response2 = response.substring(-4)
    return response

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


  deleteCalendar(calendarId: number) {
    this.eventService.deleteCalendar(calendarId).subscribe(response => {
      this.presentToast('Se han guardado los datos correctamente', 'success')// Accede al status del error
      this.route.navigate(['/home']);
      if (response.response == "The event has already occurred, it is not possible to delete it.") {
        this.presentToast('Un evento ya ocurrido no se puede borrar', 'danger')
      }
    }, (responseError: HttpErrorResponse) => {
      const error = responseError.error;
      if (error.response == "The event has already occurred, it is not possible to delete it.") {
        this.presentToast('Un evento ya ocurrido no se puede borrar', 'danger')
      }
      if (error.response == "The event has already occurred, it is not possible to delete it.") {
        this.presentToast('Un evento ya ocurrido no se puede borrar', 'danger')
      } else if (error.response == "You cannot delete events") {
        this.presentToast('Tu rol no te permite eliminar el evento', 'danger')
      } else {
        this.presentToast('No se ha podido borrar el evento', 'danger')
      }

    })

  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  openEdit(calendar: EventResponse) {
    sessionStorage.setItem('idCalendar', calendar.id.toString())

    this.setOpen(true);
  }

  setOpenExternalMusicianForm(isOpen: boolean) {
    this.musicianExternanFormOpened = isOpen;
  }

  setViewOpenExternalMusicianForm(isOpen: boolean) {
    this.viewMusicianExternanFormOpened = isOpen;
  }

  openviewExternalMusician() {
    this.setViewOpenExternalMusicianForm(true)
  }

  openMusicalExternForm() {
    this.setOpenExternalMusicianForm(true)
  }

  async editerEvento() {
    console.log(this.event)
    let paid: string = ""
    let repertoryId: string | null = ""
    if (this.event.paid == true) {
      paid = "1"
    } else {
      paid = "0"
    }
    if (this.repertoryByCalendar.id) {
      if (this.repertoryByCalendar.id == -1) {
        repertoryId = ""
      } else {
        repertoryId = this.repertoryByCalendar.id.toString()
      }
    }


    this.calendarUpdate = {
      idCalendarEvent: this.event.id.toString(),
      enumTypeActuation: this.event.type,
      title: this.event.title,
      place: this.event.place,
      paid: paid,
      description: this.event.description,
      date: this.event.date.toString(),
      amount: this.event.amount.toString(),
      penaltyPonderation: this.event.penaltyPonderation.toString(),
      idRepertory: repertoryId
    }
    console.log(this.calendarUpdate)
    this.eventService.updateCalendar(this.calendarUpdate).subscribe(response => {
      this.presentToast('Se han guardado los datos correctamente', 'success')// Accede al status del error
    }, (responseError: HttpErrorResponse) => {
      const error = responseError.error;

      if (error.response == 'No earlier date than the current date is possible') {
        this.presentToast('No puede guardar un evento anterior a la fecha actual', 'danger')
      } else if (error.response == 'You cannot update events') {
        this.presentToast('No puedes editar este evento', 'danger')
      } else if (error.response == 'Something wron') {
        this.presentToast('No es posible guardar el evento en este momento', 'danger')
      } else {
        this.presentToast('No es posible guardar el evento en este momento', 'danger')
      }

    })
    this.route.navigate(['/event/', this.event.id]);
  }

  async createExternalMusician() {
    this.externalMusician.idCalendar = this.id_event;

    if (this.externalMusician.name) {
      this.externalMusicianService.createMusician(this.externalMusician).subscribe(response => {
        this.presentToast('El músico externo se ha creado correctamente', 'success')// Accede al status del error
        this.externalMusicianService.listExternalMusician(this.id_event).subscribe((data) => this.externalMusicianList = data)
        this.route.navigate(['/event/', this.event.id]);
      }, (error: HttpErrorResponse) => {
        this.presentToast('No es posible crear músicos en este momento', 'danger')
      })
    }

    this.setOpenExternalMusicianForm(false)

  }

  deleteMusician(id: number) {
    this.externalMusicianService.deleteExternalMusician(id).subscribe(response => {
      this.presentToast('El músico externo ha sido eliminado correctamente', 'success')// Accede al status del error
      this.externalMusicianService.listExternalMusician(this.id_event).subscribe((data) => {
        this.externalMusicianList = data
      })
    }, (error: HttpErrorResponse) => {
      this.presentToast('No es posible eliminar músicos en este momento', 'danger')
    })
    this.route.navigate(['/event/', this.event.id]);
  }

  setEditable(eventDate: Date) {
    this.isEditable = this.date < eventDate;
    this.isDeletable = this.date < eventDate;
  }

  readUrl(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: ProgressEvent) => {

        this.ms = (<FileReader>event.target).result;

      }

      reader.readAsDataURL(event.target.files[0]);
    }

  }

  createMusicSheet() {
    this.musicSheet = {
      formationId: this.formation.id,
      musicSheetPdf: this.ms,
      userId: this.idUserSelected
    }
    if (this.ms) {
      this.musicSheetService.createMusicSheet(this.musicSheet).subscribe(response => {
        this.presentToast('El archivo se ha guardado correctamente', 'success')// Accede al status del error
        this.route.navigate(['/event/', this.event.id]);
      }, (error: HttpErrorResponse) => {
        this.presentToast('No es posible guardar este archivo en estos momentos', 'danger')
      })
    }
  }

  onSelectAddUserRol($event: any) {
     this.idUserSelected = $event.detail.value;
  }

  downloadPdf(pdf: string | ArrayBuffer){
    window.open(pdf.toString());
  }

}
