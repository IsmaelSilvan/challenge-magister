import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing, appRoutingProviders } from './app.routing';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';

import { ConexionService } from './services/conexion/conexion.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule, routing,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // Para que funcione la bbdd
    AngularFireStorageModule  // Para que funcione el storage
  ],
  providers: [appRoutingProviders, 
    ConexionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
