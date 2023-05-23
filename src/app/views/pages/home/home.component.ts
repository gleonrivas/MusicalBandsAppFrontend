import {Component, OnInit} from '@angular/core';
import {FormationService} from "../../../shared/services/formation.service";
import {FormationType} from "../../../shared/models/formationType.model";
import {Router} from "@angular/router";
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  public ownFormations:FormationType[]=[]
  public isPartFormations:FormationType[]=[]
  public auth = localStorage.getItem('Authorization');
  public finder: string = '';
  public formationByLink!: FormationType;

  constructor(
    private formationService:FormationService,
    private route:Router,
    private toast:ToastController,
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


}
