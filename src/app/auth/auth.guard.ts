import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {UserserviceService} from '../userservice.service';
import{Router, Event, NavigationStart} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService:UserserviceService,private rout:Router,private Nsnackbar:MatSnackBar){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
      if(!this.userService.isLoggedIn())
      {
        
        this.rout.navigate(['/login'])
                  
        this.userService.deletetoken();
 

        return false;
      }
    return true;
  }

}
