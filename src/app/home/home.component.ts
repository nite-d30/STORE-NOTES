import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../userservice.service';
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar';
import { BackendService } from '../backend.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
email;
upload=false;
  constructor(public userService:UserserviceService,private rout:Router,private Nsnackbar:MatSnackBar,private backend:BackendService ) { }

  ngOnInit(): void {

    this.email=this.userService.getUserPayload()? this.userService.getUserPayload()['username'] : '';
  }

  log() {
      this.userService.deletetoken();
      this.rout.navigate(['/login']);
     }

 //Function to upload selected file to the server.
 handleFileInput(event) {
 
   if(this.userService.isLoggedIn()){
    let files = event['target']['files'];
    if (files[0]) {
        let fileName = files[0].name;
        let fileReader: FileReader = new FileReader();
        fileReader.readAsDataURL(files[0]);
        fileReader.onloadend = (x) => {
           if (/(\.png|\.jpg|\.jpeg)$/i.test(files[0].name.substring(files[0].name.lastIndexOf('.')))) {
                this.uploadFile(files[0], fileName, files[0].name.substring(files[0].name.lastIndexOf('.') + 1));
              
            } else {
              this.Nsnackbar.open('Please upload a valid file', 'close', { duration: 2000 })
            }
        }
    }
   }else{
    this.Nsnackbar.open('Please login to change profile picture', 'close', { duration: 2000 })
   }
  
}
uploadFile(content, fileName, fileextension) {
  this.backend.uploadFile(content,fileextension).subscribe(res=>{
      if(res){
          this.upload=true;
      }else{
        this.upload=true;
      };
  })
}

}
