import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserserviceService } from '../userservice.service'
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent implements OnInit {

  constructor(private fb: FormBuilder, private userService: UserserviceService, public dialogRef: MatDialogRef<CreateNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }
  notes = this.fb.group({
    title: ['', Validators.required],
    content: ['', Validators.required]
  });

  ngOnInit(): void {
    this.notes.patchValue({
      title: this.data.title,
      content: this.data.content
    })
  }

  createnote(val, status) {
   
      if (status) {
        if (this.notes.valid) {
          this.data['title'] = val.title;
          this.data['content'] = val.content;
          this.dialogRef.close({ notesobj: this.data, status: true });
        }
      } else {
        this.dialogRef.close({ notesobj: this.data, status: false })
      }

  }
}
