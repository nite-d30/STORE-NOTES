import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Router } from '@angular/router';
import { UserserviceService } from '../userservice.service'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 
  constructor(public dialog: MatDialog, private rout: Router, private userService: UserserviceService) { }

  ngOnInit(): void {
    
  }

}
