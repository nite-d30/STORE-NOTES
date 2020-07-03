import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { UserloginComponent } from './userlogin/userlogin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component'
import { AuthGuard } from './auth/auth.guard'
import { NotesComponent } from './notes/notes.component';
const routes: Routes = [
  {
    path: 'home', component: HomeComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'notes', component: NotesComponent}
    ],canActivate:[AuthGuard]
  }
  ,
  { path: 'login', component: UserloginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, { path: '**', redirectTo: '/login', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

