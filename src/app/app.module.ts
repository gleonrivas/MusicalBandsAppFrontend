import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {LoginComponent} from './views/pages/login/login.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
// Con el import de abajo, podemos traer iconos a la aplicación de forma nativa, sin necesidad de JPG ni nada. Ahí declaramos qué icono queremos.
import {
  faBell,
  faHashtag,
  faHeart,
  faHome,
  faMessage,
  faPerson,
  faPlus,
  faSearch,
  faShare,
  faSignOut,
  faWrench,
  faXmark
} from '@fortawesome/free-solid-svg-icons';
import {NavegacionComponent} from './views/components/navegacion/navegacion.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RegistroComponent} from './views/pages/registro/registro.component';
import {HomeComponent} from './views/pages/home/home.component';
import {IonicModule} from "@ionic/angular";
import {HttpClientModule} from "@angular/common/http";
import {SquadComponent} from './views/pages/squad/squad.component';
import {NgxEchartsModule} from "ngx-echarts";
import {SquadCreateComponent} from './views/pages/squad-create/squad-create.component';
import {ProfileComponent} from './views/pages/profile/profile.component';
import {PasswordComponent} from './views/pages/password/password.component';
import {BorrowComponent} from './views/pages/borrow/borrow.component';
import {RepertoryComponent} from './views/pages/repertory/repertory.component';
import {MusicalPieceComponent} from './views/pages/musical-piece/musical-piece.component';
import {EncryptionService} from "./shared/services/encryption.service";
import {EventComponent} from "./views/pages/event/event.component";
import { PerformanceComponent } from './views/pages/performance/performance.component';
import { SquadPlayComponent } from './views/pages/squad-play/squad-play.component';
import { RehearsalComponent } from './views/pages/rehearsal/rehearsal.component';
import {NoAuthPageComponent} from "./views/pages/no-auth-page/no-auth-page.component";
import { TreasuryComponent } from './views/pages/treasury/treasury.component';
import { FullLoadingComponent } from './views/components/full-loading/full-loading.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavegacionComponent,
    FullLoadingComponent,
    RegistroComponent,
    HomeComponent,
    RegistroComponent,
    SquadComponent,
    SquadCreateComponent,
    ProfileComponent,
    PasswordComponent,
    RepertoryComponent,
    PasswordComponent,
    BorrowComponent,
    MusicalPieceComponent,
    EventComponent,
    PerformanceComponent,
    SquadPlayComponent,
    RehearsalComponent,
    NoAuthPageComponent,
    TreasuryComponent,
    FullLoadingComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      mode: 'ios'
    }),
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [EncryptionService],
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
