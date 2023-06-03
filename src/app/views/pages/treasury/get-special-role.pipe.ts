import {Pipe, PipeTransform} from '@angular/core';
import {RoleDTO} from "../../../shared/models/roleDTO";

export const getSpecialFromRoles = (roles: RoleDTO[]) => {
  const specialRoles = [
    "PRESIDENT",
    "OWNER",
    "TREASURER",
    "ADMINISTRATOR",
    "ARCHIVIST",
    "ASSISTANCE_CONTROL"
  ]
  return roles.find(role => {
    const type = role.type;
    return specialRoles.includes(type);
  }) != null;
}
@Pipe({name: 'getSpecialPipe'})
export class GetSpecialRolePipe implements PipeTransform {
  transform(roles: RoleDTO[]) {
    return getSpecialFromRoles(roles);
  }
}
