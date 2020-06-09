import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateNoteComponent } from '../create-note/create-note.component'
import { NotesService } from '../notes.service';
import { Router } from '@angular/router';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  Notes;
  email;
  constructor(public dialog: MatDialog, private rout: Router, private notesService: NotesService, private userService: UserserviceService) { }

  ngOnInit(): void {
    this.getNotes();

  }

  getNotes() {
    this.email = this.userService.getUserPayload()['username'];
    this.notesService.getNotes(this.email).subscribe(res => {
      this.Notes = res['notes'];
  
    })
  }


  createnotes() {
    let notesobj = {
      email: '',
      title: '',
      content: '',
      action: 'create'
    }
    this.Notes.push(notesobj)
    this.opendilogue();

  }

  opendilogue(index?) {
    let currentIndex = this.Notes.length - 1;
    if (index >= 0) {
      currentIndex = index;
    }
    this.dialog.open(CreateNoteComponent, {
      width: '50%',
      data: this.Notes[currentIndex],
      autoFocus: false,
      restoreFocus: false,
      disableClose: true
    }).afterClosed().subscribe(result => {
      if (result.status) {
        if (result.notesobj['action'] == 'create') {
          this.notesService.storeNotes(result.notesobj).subscribe();
          this.getNotes();
        }

        if (result.notesobj['action'] == 'edit') {
          this.notesService.updateNotes(result.notesobj).subscribe();
          this.getNotes();
        }

      } else if (result.notesobj['action'] == "create") {
        this.Notes.pop();
      }
    }
    );
}
}
