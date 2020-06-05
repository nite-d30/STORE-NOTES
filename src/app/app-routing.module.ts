import { NgModule } from '@angular/core';
import { Routes, RouterModule,CanActivate } from '@angular/router';
import {UserloginComponent} from './userlogin/userlogin.component';
import { DashboardComponent} from './dashboard/dashboard.component';
import { HomeComponent} from './home/home.component'
import {AuthGuard} from './auth/auth.guard'

const routes: Routes = [
  {path:'home',component:HomeComponent,children:[
    {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
  ]}
  ,
{path:'login',component:UserloginComponent},
{path:'',redirectTo:'/home/dashboard',pathMatch:'full'},{path:'**',redirectTo:'/home',pathMatch:'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

