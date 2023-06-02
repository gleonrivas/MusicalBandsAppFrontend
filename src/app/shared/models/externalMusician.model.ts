import {CalendarEventDTODelete} from "./eventModels/CalendarEventDTODelete";
import {CalendarEventUpdateDTO} from "./eventModels/calendarEventUpdateDTO";

export type ExternalMusicianModel ={
  amount: number,
  dni: string,
  name: string,
  surname: string,
  idCalendar: number,
  bankAccount: string,
  email:string,
  phone: string
}

export type ExternalMusicianResponse = {
  id:number,
  amount: number,
  dni: string,
  name: string,
  surname: string,
  idCalendar: number,
  bankAccount: string,
  email:string,
  phone: string
}


export type ExternalMusicianTreasury = {
  id:number,
  amount: number,
  dni: string,
  name: string,
  surname: string,
  calendar: CalendarEventUpdateDTO,
  bankAccount: string,
  email:string,
  phone: string,
  active:boolean,
  paid:boolean
}
