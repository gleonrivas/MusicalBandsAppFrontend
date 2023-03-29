import { NgModule } from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import {LoginComponent} from "./views/pages/login/login.component";
import {RegistroComponent} from "./views/pages/registro/registro.component";


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
    path: 'registro',
    component: RegistroComponent
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
