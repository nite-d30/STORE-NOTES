import { Component, OnInit, Optional } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger, state } from '@angular/animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateNoteComponent } from '../create-note/create-note.component'
import { NotesService } from '../notes.service';
import { Router } from '@angular/router';
import { UserserviceService } from '../userservice.service';
import { BackendService } from '../backend.service'
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
  animations: [
    trigger('listAnimation', [

      transition(':enter', [
        query('.col', style({ opacity: 0, transform: 'translateX(-60px)', offset: 0 }), { optional: true }),
        query('.col', stagger('50ms', [
          animate('800ms 0s ease-out', style({ opacity: 1, transform: 'translateX(0px)' }))
        ]), { optional: true })
      ]),

      // transition(':leave',[
      //   query(':enter',style({opacity:0,transform:'translateX(-60px)',offset:0}),{optional:true}),
      //   query(':enter',stagger('50ms',[
      //     animate('800ms 0s ease-out',style({opacity:1,transform:'translateX(0px)'}))
      //   ]),{optional:true})
      // ])
    ])
  ]
})
export class NotesComponent implements OnInit {

  Notes;
  email;
  allComplete: boolean = false;

  //Pagination
  page_Index = 1;         //  Paginator index
  pageSize = 10;          //  Pagination size
  pager = [];             //  Array of paginator
  currntPageNum = 1;
  totalCount;             //  Total Data Count
  paginationIndex = 1;

  constructor(private backend: BackendService, public dialog: MatDialog, private rout: Router, private notesService: NotesService, private userService: UserserviceService) {

  }

  ngOnInit(): void {

    this.getNotes(this.page_Index, this.pageSize);
  }

  getNotes(pageNumber?, pageSize?) {
    this.page_Index = pageNumber;
    this.currntPageNum = pageNumber;

    this.email = this.userService.getUserPayload()['username']
    this.notesService.getNotes({ pageSize: pageSize, pageNumber: pageNumber, email: this.email }).subscribe(res => {
      this.Notes = res['notes'];
      this.totalCount = res['totalCount'];
    // if(this.page_Index== 1)      
        this.setPagination(this.page_Index);

      if (this.Notes.length <= 10) {
        let notesobj = {
          action: 'create',
          title: 'Create Note'
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
    if (this.Notes.find(t => t.completed == true))
      return true
  }


  deletenotes() {
    let delarr = [];
    this.Notes.filter((el, index) => {
      if (el.completed) {
        delarr.push(el.uuid)
      }
    });
    if (delarr.length)
      this.notesService.deletnotes(delarr).subscribe(res=>{
        if(res){

          if (this.Notes.length == 2) {
            console.log('he')
            this.page_Index--;
            this.currntPageNum--;
            console.log(this.Notes.length)
            this.totalCount=this.totalCount-(this.Notes.length-1); 
            this.setPagination(this.paginationIndex); 
        }
          this.setPagination(this.paginationIndex);
        this.getNotes(this.currntPageNum, this.pageSize);
        console.log(this.totalCount)
        }
      });

    
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
          result.notesobj['action'] = 'edit';
          result.notesobj['email'] = this.userService.getUserPayload()['username'];
          this.notesService.storeNotes(result.notesobj).subscribe();
          this.totalCount=this.totalCount+1;
          this.setPagination(this.paginationIndex);
          this.getNotes(this.currntPageNum, this.pageSize);
          return;
        }

        if (result.notesobj['action'] == 'edit') {
          this.notesService.updateNotes(result.notesobj).subscribe();
          this.getNotes(this.currntPageNum, this.pageSize);
          return;
        }

      } else if (result.notesobj['action'] == "create") {
        this.Notes.pop();
        this.getNotes(this.currntPageNum, this.pageSize);
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
    this.getNotes(start, pageSize)
  }

}
