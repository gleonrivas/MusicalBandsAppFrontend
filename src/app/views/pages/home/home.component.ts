import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormationService} from "../../../shared/services/formation.service";
import {FormationType} from "../../../shared/models/formationType.model";
import {Router} from "@angular/router";
import {ToastController} from "@ionic/angular";
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { INITIAL_EVENTS, createEventId } from './events-utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: false,
    selectable: false,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  currentEvents: EventApi[] = [];



  public ownFormations:FormationType[]=[]
  public isPartFormations:FormationType[]=[]
  public finder: string = '';
  public formationByLink!: FormationType;

  constructor(
    private formationService:FormationService,
    private route:Router,
    private toast:ToastController,
    private changeDetector: ChangeDetectorRef
    ) {
  }



  ngOnInit(){
    this.formationService.getUserFormationsByOwner().subscribe((data) => {
      this.ownFormations = [];
      data.forEach((result: any) => {
        const {id, active, designation, foundationYear, logo, name, type} = result;
        this.ownFormations.push({
          id: id,
          active: active,
          designation: designation,
          foundationYear: foundationYear,
          logo: logo,
          name: name,
          type: type,
        });
      });
      console.log('propietario',this.ownFormations)

    });
    this.formationService.getUserFormationsByUser().subscribe((data) => {
      this.isPartFormations = data;
      });
      console.log('participante',this.isPartFormations);
  }

  searchFormation() {
    if (!this.finder && this.finder.length<30) {
      !this.formationByLink;
      console.log(this.formationByLink)
    }else {
      this.formationService.getUserFormationByInvitation({link: this.finder}).subscribe((data) => {
        this.formationByLink = data
        console.log(data)

        if (!this.finder || this.finder.length<30) {
          !this.formationByLink;
        }
      });
    }
  }


  openFormation(formation:FormationType){
    this.formationService.setFormation(formation);
    this.route.navigate(['/formacion']);
  }


  verifyYourFormations():boolean {
    const formacionesCombinadas = this.ownFormations.concat(this.isPartFormations);
    const formationEncontrada = formacionesCombinadas.find(formation => formation.id === this.formationByLink.id);
    return !!formationEncontrada;
  }

  async acceptInvitation(formation: FormationType, invitation: any) {
    try {
      await this.formationService.acceptFormationByInvitation({link: invitation}).toPromise();
      this.presentToast('Has aceptado la invitacion. Ahora formas parte de ' + formation.name, 'success');
      this.openFormation(formation);
    } catch (error) {
      console.error(error);
      this.presentToast('Hubo un error, inténtalo de nuevo mas tarde.', 'danger');
    }
  }



  async presentToast(message:string, color:string) {
    const toast = await this.toast.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      color: color
    });

    await toast.present();
  }






  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }

}
