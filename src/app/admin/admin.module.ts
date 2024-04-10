import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfficersComponent } from './pages/officers/officers.component';
import { MaterialModule } from '../material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OfficerDialogComponent } from './dialogs/officer-dialog/officer-dialog.component';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { BudgetaryModalComponent } from './modals/budgetary-modal/budgetary-modal.component';
import { FormAttComponent } from './pages/form-att/form-att.component';

@NgModule({
  declarations: [
    OfficersComponent,
    OfficerDialogComponent,
    BudgetaryModalComponent,
    FormAttComponent
     
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxGraphModule,
    
  ]
})
export class AdminModule { }
