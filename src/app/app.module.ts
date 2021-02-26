import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// Modulos del routing
import { routing, appRoutingProviders } from './app.routing';

// Modulos para los formularios
import { FormsModule } from '@angular/forms';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

// froala-editor
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

// angular-file-uploader
import { AngularFileUploaderModule } from "angular-file-uploader";

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { CategoryNewComponent } from './components/category-new/category-new.component';
import { PostNewComponent } from './components/post-new/post-new.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ErrorComponent,
    HomeComponent,
    UserEditComponent,
    CategoryNewComponent,
    PostNewComponent,
    PostDetailComponent,
    PostEditComponent,
    CategoryDetailComponent,
 
  ],
  imports: [
    BrowserModule,
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
    AngularFileUploaderModule,
    routing,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }




 