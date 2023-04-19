import {EnumFormationType} from "./Enum/EnumFormationType";


export type FormationType = {

  id?:number,
  active?:boolean,
  designation?:string,
  foundationYear?:string,
  logo?:string,
  name?:string,
  type?:EnumFormationType,
  origin?:string,

}
