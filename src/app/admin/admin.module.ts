import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfficersComponent } from './pages/officers/officers.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { MaterialModule } from '../material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { JobDialogComponent } from './dialogs/job-dialog/job-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OfficerDialogComponent } from './dialogs/officer-dialog/officer-dialog.component';
import { LevelsComponent } from './pages/levels/levels.component';
import { LevelDialogComponent } from './dialogs/level-dialog/level-dialog.component';
import { SalaryComponent } from './pages/salary/salary.component';
import { BudgetaryComponent } from './pages/budgetary/budgetary.component';
import { BudgetaryDialogComponent } from './dialogs/budgetary-dialog/budgetary-dialog.component';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { DependencesDialogComponent } from './dialogs/dependences-dialog/dependences-dialog.component';
import { DependencesComponent } from './pages/dependences/dependences.component';
import { RotationOfficerDialogComponent } from './dialogs/rotation-officer-dialog/rotation-officer-dialog.component';
import { RotationJobDialogComponent } from './dialogs/rotation-job-dialog/rotation-job-dialog.component';
import { BudgetaryModalComponent } from './modals/budgetary-modal/budgetary-modal.component';
import { FormAttComponent } from './pages/form-att/form-att.component';

@NgModule({
  declarations: [
    OfficersComponent,
    JobsComponent,
    JobDialogComponent,
    OfficerDialogComponent,
    LevelsComponent,
    LevelDialogComponent,
    SalaryComponent,
    BudgetaryComponent,
    BudgetaryDialogComponent,
    DependencesDialogComponent,
    DependencesComponent,
    RotationOfficerDialogComponent,
    RotationJobDialogComponent,
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
