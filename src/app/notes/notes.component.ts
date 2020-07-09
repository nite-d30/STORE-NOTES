import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateNoteComponent } from '../create-note/create-note.component'
import { NotesService } from '../notes.service';
import { Router } from '@angular/router';
import { UserserviceService } from '../userservice.service';
import {BackendService} from '../backend.service'
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  Notes;
  email;
  allComplete: boolean = false;

  //Pagination
  page_Index = 1;         //  Paginator index
  pageSize = 10;          //  Pagination size
  pager = ['1','2','3'];             //  Array of paginator
  currntPageNum = 1;
  totalCount;             //  Total Data Count
  paginationIndex = 1;

  constructor(private backend:BackendService,public dialog: MatDialog, private rout: Router, private notesService: NotesService, private userService: UserserviceService) { 
    
  }

  ngOnInit(): void {
    
    this.getNotes();
  }

  getNotes() {
    this.page_Index = 1;
    this.email = this.userService.getUserPayload()['username']
    this.notesService.getNotes(this.email).subscribe(res => {
      this.Notes = res['notes'];
      if(this.Notes.length >=0 ){
        let notesobj = {
          action: 'create',
          title:'Create Note'
        }
        this.Notes.push(notesobj)      
      }
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

  opendilogue(index?) {
    let currentIndex = this.Notes.length - 1;
    if (index >= 0) {
      currentIndex = index;
    }
    this.dialog.open(CreateNoteComponent, {
      width: '40%',
      data: this.Notes[currentIndex],
      autoFocus: false,
      restoreFocus: false,
      disableClose: true
    }).afterClosed().subscribe(result => {
      if (result.status) {
        if (result.notesobj['action'] == 'create') {
          result.notesobj['action']='edit';
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

  setPagination(index) {
    let totalPagesize = Math.ceil(this.totalCount / this.pageSize);
    totalPagesize = Math.ceil(totalPagesize / this.pageSize);
    if (totalPagesize >= index && index > 0) {
        let obj = this.backend.pagination(index, this.totalCount, this.pageSize);
        if (obj) {
            this.pager = obj['pager'];
            this.page_Index = obj['page_Index'];
        }
        this.paginationIndex = index;
    }
}

/**
 * Method for Pagination list
 * @param start - start page
 * @param pageSize - Total Page size
 */
pageItem(start, pageSize) {
    this.currntPageNum = start;
    this.pageSize = pageSize;
    this.setPagination(this.paginationIndex);

}

}
