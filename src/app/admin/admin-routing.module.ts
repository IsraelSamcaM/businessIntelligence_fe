import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfficersComponent } from './pages/officers/officers.component';
import { FormAttComponent } from './pages/form-att/form-att.component';



const routes: Routes = [
  { path: 'officers', component: OfficersComponent },
  { path: 'att', component: FormAttComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

