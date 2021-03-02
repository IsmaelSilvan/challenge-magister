import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing, appRoutingProviders } from './app.routing'; // Modulo del routing
import { FormsModule } from '@angular/forms';                 // Modulo de los formularios

// Modulos para Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';


// Modulos de los servicios
import { ConexionService } from './services/conexion/conexion.service';


// Modulos de componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FormComponent } from './components/form/form.component';
import { EndComponent } from './components/end/end.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FormComponent,
    EndComponent
  ],
  imports: [
    BrowserModule, routing, FormsModule, // Modulos para fistintas funcionalidades
    AngularFireModule.initializeApp(environment.firebase), // Modulo para enlazar con Firebase
    AngularFirestoreModule, // Para que funcione la bbdd
    AngularFireStorageModule  // Para que funcione el storage
  ],
  providers: [
    appRoutingProviders, 
    ConexionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
