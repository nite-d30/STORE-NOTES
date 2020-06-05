import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {UserserviceService} from '../userservice.service';
import{Router} from '@angular/router'
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService:UserserviceService,private rout:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
      if(!this.userService.isLoggedIn())
      {
        this.rout.navigate(['/home'])
        this.userService.deletetoken();
        return false;
      }
    return true;
  }

}
