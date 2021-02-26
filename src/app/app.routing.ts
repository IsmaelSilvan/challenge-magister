// Importar los modulos del router
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// importamos los componentes
import { HomeComponent } from './components/home/home.component';
        // Usuarios
 
// Matriz de rutas / Definir las rutas
const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'inicio', component: HomeComponent },
   
];


// Exportar modulos del router
export const appRoutingProviders: any[] = []; // Esto es para que funcionen bien los servicios de ruta a nivel interno/Exportamos el servicio
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes); //Exportamos el modulo