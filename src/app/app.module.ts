import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterailModule} from './material.module';
import { FormsModule }   from '@angular/forms';
import { UserserviceService } from './userservice.service';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { UserloginComponent } from './userlogin/userlogin.component';
import { HomeComponent } from './home/home.component';
import { CreateNoteComponent } from './create-note/create-note.component';
import { DashboardComponent } from './dashboard/dashboard.component'

//authgaurd
import {AuthGuard} from './auth/auth.guard'
import {AuthInterceptor} from './auth/auth.intercepter';

@NgModule({
  declarations: [
    AppComponent,
    UserloginComponent,
    HomeComponent,
    CreateNoteComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterailModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true
  },AuthGuard,UserserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
