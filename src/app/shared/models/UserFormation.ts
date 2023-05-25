import {RoleDTO} from "./roleDTO";

export type UserFormation ={
  id: number,
  name: string,
  image:string,
  surName: string,
  email: string,
  birthDate: string,
  roleDTOList: RoleDTO[]
}
