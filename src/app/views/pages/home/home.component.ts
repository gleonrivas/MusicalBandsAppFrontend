import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormationService} from "../../../shared/services/formation.service";
import {FormationType} from "../../../shared/models/formationType.model";
import {Router} from "@angular/router";
import {ToastController} from "@ionic/angular";
import {CalendarOptions, DateSelectArg, EventApi, EventClickArg, EventInput,} from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import {EventService} from "../../../shared/services/event.service";
import {CalendarType} from "../../../shared/models/calendarType.model";
import {createEventId} from "./events-utils";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  isModalOpen = false;

  public eventCalendarModal!: CalendarType

  originalEvents: CalendarType[] = []
  calendarEvents:EventInput[] = []
  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,listWeek'
    },
    locale: 'esLocale',
    eventColor: 'black',
    eventBackgroundColor:'black',
    eventBorderColor:'black',
    eventTextColor:'white',
    initialView: 'dayGridMonth',
    weekends: true,
    editable: false,
    selectable: false,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
  };
  currentEvents: EventApi[] = [];



  public ownFormations:FormationType[]=[]
  public isPartFormations:FormationType[]=[]
  public finder: string = '';
  public formationByLink!: FormationType;

  constructor(
    private formationService:FormationService,
    private eventService:EventService,
    private route:Router,
    private toast:ToastController,
    private changeDetector: ChangeDetectorRef
    ) {
  }



  async ngOnInit() {
    this.eventService.getMyEvents().subscribe((data) => {
        for (let e of data) if (e.date) {
          this.originalEvents.push(e)
        }
        console.log('calendario', this.originalEvents);
      }
    );
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
      console.log('propietario', this.ownFormations)
    });
    this.formationService.getUserFormationsByUser().subscribe((data) => {
      this.isPartFormations = data;
    });
















    this.calendarOptions.initialEvents = async () => {
      this.calendarEvents = []
      for (const event of this.originalEvents) {
        const newCalendarEvent: EventInput = {
          id: event.id?.toString(),
          title: `${
            event.id
            + ',' +
            event.place
            + ',' +
            event.date?.split('T')[0]
            + ',' +
            event.title
            + ',' +
            event.description
            + ',' +
            event.type
            + ',' +
            event.paid
            + ',' +
            event.amount
            + ',' +
            event.penaltyPonderation
          }`,
          start: event.date?.split('T')[0],
          allDay:false
        };
        if (event.date) {
          this.calendarEvents.push(newCalendarEvent);
        }
      }
      return this.calendarEvents;
    };

    // @ts-ignore
    const events = await this.calendarEvents();
    // --------------------------------------------------------------------










    console.log('eeeee', this.calendarOptions.initialEvents);

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


  openFormation(formationId:number){
    this.isModalOpen = false
    setTimeout(() => {
      this.formationService.setFormation(formationId);
      this.route.navigate(['/formacion']);
    }, 500);  }
  openEvent(eventId:number){
    this.isModalOpen = false
    setTimeout(() => {
      this.formationService.setFormation(this.eventCalendarModal.id!);
      this.route.navigate(['/event/'+eventId]);
    }, 500);  }


  verifyYourFormations():boolean {
    const formacionesCombinadas = this.ownFormations.concat(this.isPartFormations);
    const formationEncontrada = formacionesCombinadas.find(formation => formation.id === this.formationByLink.id);
    return !!formationEncontrada;
  }

  async acceptInvitation(formation: FormationType, invitation: any) {
    try {
      await this.formationService.acceptFormationByInvitation({link: invitation}).toPromise();
      this.presentToast('Has aceptado la invitacion. Ahora formas parte de ' + formation.name, 'success');
      this.openFormation(formation.id!);
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

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  handleEventClick(clickInfo: EventClickArg) {
    this.parseCalendarString(clickInfo.event.title)
    this.isModalOpen = true
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }

  parseCalendarString(calendarString: string) {
    const calendarArray = calendarString.split(',');

    this.eventCalendarModal = {
      id: parseInt(calendarArray[0]),
      place: calendarArray[1],
      date: calendarArray[2],
      title: calendarArray[3],
      description: calendarArray[4],
      type: calendarArray[5],
      paid: calendarArray[6] === 'true',
      amount: parseFloat(calendarArray[7]),
      penaltyPonderation: parseInt(calendarArray[8])
    };
  }


}
