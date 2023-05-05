import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { BusquedaComponent } from './pages/busqueda/busqueda.component';


const routes: Routes = [
  {path: "", component:  BusquedaComponent},
  {path: "pages/catalogo", component: CatalogoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
