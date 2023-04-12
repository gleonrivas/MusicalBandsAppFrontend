import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './views/pages/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
// Con el import de abajo, podemos traer iconos a la aplicación de forma nativa, sin necesidad de JPG ni nada. Ahí declaramos qué icono queremos.
import {faHome, faMessage, faBell, faHashtag, faWrench, faPerson, faPlus, faShare, faXmark, faSearch, faHeart, faSignOut} from '@fortawesome/free-solid-svg-icons';
import { NavegacionComponent } from './views/components/navegacion/navegacion.component';
import {FormsModule} from "@angular/forms";
import { RegistroComponent } from './views/pages/registro/registro.component';
import { HomeComponent } from './views/pages/home/home.component';
import {IonicModule} from "@ionic/angular";
import {RegistroComponent} from "./views/pages/registro/registro.component";
import {HttpClientModule} from "@angular/common/http";
import { SquadComponent } from './views/pages/squad/squad.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavegacionComponent,
    RegistroComponent,
    HomeComponent,
    RegistroComponent,
    SquadComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
  // Dentro del constructor de abajo, debemos colocar los iconos que hayamos importado arriba.
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faHome,
      faBell,
      faWrench,
      faMessage,
      faPerson,
      faPlus,
      faShare,
      faXmark,
      faSearch,
      faHeart,
      faSignOut,
      faHashtag
    );
  }
}
