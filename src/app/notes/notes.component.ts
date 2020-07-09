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
  allComplete: boolean = false;


  constructor(public dialog: MatDialog, private rout: Router, private notesService: NotesService, private userService: UserserviceService) { }

  ngOnInit(): void {
    this.getNotes();

  }

  getNotes() {
    this.email = this.userService.getUserPayload()['username']
    this.notesService.getNotes(this.email).subscribe(res => {
      this.Notes = res['notes'];

    })
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.Notes == null) {
      return;
    }
    this.Notes.forEach(t => t.completed = completed);
  }
  someComplete(): boolean {
    if (this.Notes.length < 0) {
      return false;
    }
    return this.Notes.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  updateAllComplete() {
    this.allComplete = this.Notes != null && this.Notes.every(t => t.completed);
    if(this.Notes.find(t=> t.completed == true))
        return true
  }

deletenotes(){
let delarr=[];
  this.Notes.filter((el,index) => {
    if(el.completed){
        delarr.push(el.uuid)
    }
  });
  if(delarr.length)
      this.notesService.deletnotes(delarr).subscribe();
      
  this.getNotes();
}

  createnotes() {
    let notesobj = {
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
          result.notesobj['email'] = this.userService.getUserPayload()['username'];
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
