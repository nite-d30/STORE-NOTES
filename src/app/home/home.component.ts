import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../userservice.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
email;
  constructor(public userService:UserserviceService,private rout:Router ) { }

  ngOnInit(): void {

    this.email=this.userService.getUserPayload()? this.userService.getUserPayload()['username'] : '';
  }

  log() {
    if(this.userService.isLoggedIn()){
      this.userService.deletetoken();
      this.rout.navigate(['/home']);
    }else{
      this.userService.deletetoken();
      this.rout.navigate(['/login']);
    }


  }

}
