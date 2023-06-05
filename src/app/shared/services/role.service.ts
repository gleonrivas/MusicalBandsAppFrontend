import {Injectable} from "@angular/core";
import {FormationUserRole} from "../models/formationUserRole";
import {RestService} from "./rest.service";
import {EncryptionService} from "./encryption.service";

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(
    private rest: RestService,
  ) { }
  createRole(formationRole: FormationUserRole) {
      return this.rest.post<FormationUserRole>("http://localhost:8080/role/create", formationRole);
  }
}
