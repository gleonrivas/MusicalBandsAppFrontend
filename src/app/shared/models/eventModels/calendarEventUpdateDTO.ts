export type CalendarEventUpdateDTO ={
  idCalendarEvent: string,
  enumTypeActuation: string, //EnumTypeActuation
  title:string,
  place:string,
  paid:string, //boolean
  description: string,
  date: string, //LocalDate
  amount:string,  //Double
  penaltyPonderation: string, //Double
  idRepertory:string, //Integer
}
