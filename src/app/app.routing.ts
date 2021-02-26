// Importar los modulos del router
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// importamos los componentes
import { HomeComponent } from './components/home/home.component';
        // Usuarios
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
        // Categorias
import { CategoryNewComponent } from './components/category-new/category-new.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
        // Publicaciones
import { PostNewComponent } from './components/post-new/post-new.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';

import { ErrorComponent } from './components/error/error.component';


// Matriz de rutas / Definir las rutas
const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'inicio', component: HomeComponent },
        // Rutas para el usuario
    { path: 'registro', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'logout/:sure', component: LoginComponent },
    { path: 'ajustes', component: UserEditComponent },
        // Rutas para las categorias
    { path: 'crear-categoria', component: CategoryNewComponent },
    { path: 'categoria/:id', component: CategoryDetailComponent },
        // Rutas para las publicaciones
    { path: 'crear-entrada', component: PostNewComponent },
    { path: 'entrada/:id', component: PostDetailComponent },
    { path: 'editar-entrada/:id', component: PostEditComponent },

    {path: '**', component: ErrorComponent}
];


// Exportar modulos del router
export const appRoutingProviders: any[] = []; // Esto es para que funcionen bien los servicios de ruta a nivel interno/Exportamos el servicio
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes); //Exportamos el modulo