import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {EventService} from "../../../shared/services/event.service";
import {FormationService} from "../../../shared/services/formation.service";
import {GetMeService} from "../../../shared/services/get-me.service";
import {RepertoryService} from "../../../shared/services/repertory.service";
import {AbsenceService} from "../../../shared/services/absence.service";
import {MusicalPieceService} from "../../../shared/services/musical-piece.service";
import {ToastController} from "@ionic/angular";
import {ExternalMusicianService} from "../../../shared/services/externalMusician.service";
import {FormationType} from "../../../shared/models/formationType.model";
import {EnumFormationType} from "../../../shared/models/Enum/EnumFormationType";

@Component({
  selector: 'app-treasury',
  templateUrl: './treasury.component.html',
  styleUrls: ['./treasury.component.css']
})
export class TreasuryComponent {
constructor(private readonly router: ActivatedRoute,
            private readonly location:Location,
            private readonly eventService: EventService,
            private readonly formationService: FormationService,
            private readonly getMeService: GetMeService,
            private readonly repertoryService: RepertoryService,
            private readonly externalMusicianService: ExternalMusicianService,
            private readonly route: Router) {

}
  public id_formation: number = -1;
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

ngOnInit(){
  this.router.paramMap.subscribe((value) => {
    const id = value.get('id_formation');
    if (id !== null) {
      this.id_formation = parseInt(id);
    }
  });

  this.formationService.getFormationById(this.id_formation).subscribe((data)=>{
    this.formation=data
  })

}

}
