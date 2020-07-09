import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserserviceService } from '../userservice.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  userdetail = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
    phonenumber: ['', [Validators.required,Validators.pattern(/^[2-9]{2}[0-9]{8}$/)]],
    password: ['', [Validators.required,Validators.pattern(/^(?=.*?[A-Z]|[a-z])((?=.*?[0-9])|(?=.*?[!@#$%&*])).{10}$/)]],
    confirmpassword: ['', [Validators.required]]
},
    {
        validator: this.checkPasswords
    })


constructor(private fb: FormBuilder, private rout: Router, private userservice: UserserviceService, private snackbar: MatSnackBar) {

}

ngOnInit() {

}

checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmpassword').value;

    return pass === confirmPass ? null : { notSame: true }
}

submit(userObj) {
    if (this.userdetail.valid) {
        this.userservice.userRegistration(userObj).subscribe(res => {
            console.log(res)
            if (res['status']) {
                // this.userservice.setToken(res['token']);
                 this.rout.navigate(['/login']);
            }else{
                this.snackbar.open(res['msg'],'close',{duration:2000})
            }
        })
    }else{
        this.snackbar.open('Please fill all the details','close',{duration:2000})
    }

}
}
