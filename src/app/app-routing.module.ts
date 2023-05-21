import { NgModule } from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import {LoginComponent} from "./views/pages/login/login.component";
import {SquadComponent} from "./views/pages/squad/squad.component";
import {HomeComponent} from "./views/pages/home/home.component";
import {RegistroComponent} from "./views/pages/registro/registro.component";
import {SquadCreateComponent} from "./views/pages/squad-create/squad-create.component";
import {ProfileComponent} from "./views/pages/profile/profile.component";
import {PasswordComponent} from "./views/pages/password/password.component";
import {RepertoryComponent} from "./views/pages/repertory/repertory.component";
import {BorrowComponent} from "./views/pages/borrow/borrow.component";
import {MusicalPieceComponent} from "./views/pages/musical-piece/musical-piece.component";
import {NoAuthPageComponent} from "./views/pages/no-auth-page/no-auth-page.component";
import {AuthGuard} from "./shared/auth/auth";


// Declaración de la rutas, aquí es donde hay que meter el código que sea

const routes: Routes = [
  // cada ruta va dentro de {}
  {
    // path es el enlace que pondremos en el navegador
    path: 'login',
    // component hace referencia a componente que vayamos a enrutar, que se debe de importar arriba
    component: LoginComponent
  },
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: 'formacion',
    component: SquadComponent
  },
  {
    path: 'home', canActivate: [AuthGuard],
    component: HomeComponent
  },
  {
    path: 'instrumentos',
    component: BorrowComponent
  },
  {
    path: 'crearformacion',
    component: SquadCreateComponent
  },
  {
    path: 'profile', canActivate: [AuthGuard],
    component: ProfileComponent
  },
  {
    path: 'password', canActivate: [AuthGuard],
    component: PasswordComponent
  },
  {
    path: 'repertory', canActivate: [AuthGuard],
    component: RepertoryComponent
  },
  {
    path: 'pleaseLoggin',
    component: NoAuthPageComponent
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
