import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';




@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  noAuthHttpHeader={headers:new HttpHeaders({'NoAuth':'True'})}
  constructor(private http:HttpClient) {

   }
   userlogin(userobj){
     
      return this.http.post(`http://localhost:8000/api/user/login`,userobj,this.noAuthHttpHeader);
   }

   setToken(token:string){
     localStorage.setItem("token",token);
   }

   getToken(){
    return localStorage.getItem('token')
  }

   getUserPayload(){
     let token=this.getToken();
     if(token){
       var UserPayload=atob(token.split('.')[1])
       return JSON.parse(UserPayload)
     }else{
       return null;
     }
   }

   isLoggedIn(){
     let UserPayload=this.getUserPayload();
     
     if(UserPayload && UserPayload.username){      
        return true;
     }else
         return false
   }

   deletetoken(){
    localStorage.removeItem('token')
   }
}
