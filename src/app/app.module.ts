import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { BusquedaComponent } from './pages/busqueda/busqueda.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';


@NgModule({
  declarations: [
    AppComponent,
    CatalogoComponent,
    BusquedaComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatSliderModule,
    AppRoutingModule,
    BrowserAnimationsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
