import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserserviceService } from '../userservice.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {
  userdata = this.fb.group({
    email: ['',[Validators.required,Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
    password: ['',[Validators.required, Validators.pattern(/^[a-zA-z0-9@!#$%6&*]+(\s[a-zA-Z\(\)]+)*$/)]]
  })
  constructor(private snackbar: MatSnackBar, private fb: FormBuilder, private userService: UserserviceService, private rout: Router) { }
  hide=true;
  ngOnInit(): void {
    if (this.userService.isLoggedIn())
      this.rout.navigate(['/home/dashboard']);
  }
  submit(userdata) {

    if(this.userdata.valid){

      this.userService.userlogin(userdata).subscribe(res => {

        this.userService.setToken(res['token']);
        this.rout.navigate(['/home/dashboard']);
      }, err => {
        this.snackbar.open(err.error, 'close', { duration: 2000 })
      }
      )
  
    }else{
      this.snackbar.open('invalid username or password', 'close', { duration: 2000 })
    }

  }

}
