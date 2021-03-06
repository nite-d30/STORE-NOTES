import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ReactiveFormsModule } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
    declarations: [],
    imports: [MatFormFieldModule,
        MatInputModule,
        MatMenuModule,
        MatCheckboxModule,
        FlexLayoutModule,
        MatButtonModule,
        MatCardModule,
        MatSnackBarModule,
        MatToolbarModule,
        MatIconModule,
        MatTooltipModule,
        MatDialogModule,
        MatSidenavModule,
        ReactiveFormsModule,
        
    ],
    exports:[MatFormFieldModule,
        MatInputModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatMenuModule,
        MatCardModule,
        MatCheckboxModule,
        MatSidenavModule,
        MatSnackBarModule,
        MatDialogModule,

        MatTooltipModule,
        MatIconModule,
        MatToolbarModule
    ],
    entryComponents:[MatDialogModule]
})
export class MaterailModule{}