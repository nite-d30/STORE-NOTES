import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {UserserviceService} from '../userservice.service'
@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent implements OnInit {

  constructor(private userService:UserserviceService, public dialogRef: MatDialogRef<CreateNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }
  notes;

  ngOnInit(): void {
   
    this.notes=this.data;
    this.notes['email'] = this.userService.getUserPayload()['username'];
    
  }

  createnote(status) {
    if (status) {
            this.dialogRef.close({ notesobj: this.notes, status: true });
    }else{
      this.dialogRef.close({notesobj: this.notes,status:false})
    }
   }
}
