import {HttpInterceptor,HttpRequest,HttpHandler,HttpEvent} from '@angular/common/http';
import{Injectable} from '@angular/core';
import { tap, map} from 'rxjs/operators';
import { UserserviceService } from '../userservice.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable()

export class AuthInterceptor implements HttpInterceptor{
    constructor(private userService:UserserviceService,private rout:Router){}
    intercept(req:HttpRequest<any>,next:HttpHandler): Observable<HttpEvent<any>>{
        if(req.headers.get('noauth'))
            return next.handle(req.clone());
        else{
           
            const clonedreq=req.clone({
                headers:req.headers.set("Authorization","Bearer" +" "+ this.userService.getToken())
            });
            return next.handle(clonedreq).pipe(
              tap(ev=>{},err=>{
                
                if(err.error.auth==false){
                                        
                    this.rout.navigate(['/login'])
                    
               
                    
                    this.userService.deletetoken();
                }
              })
                
            )
        }
    }



}