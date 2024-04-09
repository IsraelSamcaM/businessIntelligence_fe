import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { BudgetaryService } from '../../services/budgetary.service.service';
import { BudgetaryModalComponent } from '../../modals/budgetary-modal/budgetary-modal.component';

@Component({
  selector: 'app-budgetary-dialog',
  templateUrl: './budgetary-dialog.component.html',
  styleUrls: ['./budgetary-dialog.component.css']
})
export class BudgetaryDialogComponent {
 
  budgetarys: any[] = []
  

  FormBudgetary: FormGroup = this.fb.group({
    codigo: ['', Validators.required],
    nombrePartida: ['', Validators.required],
    fuenteFinanciamiento: ['', Validators.required],
    organismoFinanciador: ['', Validators.required],
    tipoGasto: ['', Validators.required],
    objetivo: ['', Validators.required],
    activo: [false, Validators.required],
  }); 
  
  constructor(
    private partidaService: BudgetaryService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<BudgetaryDialogComponent>,
    private usuariosService: BudgetaryService,
    public dialog: MatDialog,
    
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    if (this.data) {
      this.FormBudgetary.patchValue(this.data)
      console.log(this.data)
    }
  }

  guardar() {
    if (this.data) {  
      this.usuariosService.edit(this.data._id, this.FormBudgetary.value).subscribe(budgetarys => {
        this.dialogRef.close(budgetarys);
      })
    }
    else {
      this.usuariosService.add(this.FormBudgetary.value).subscribe(budgetarys => {
        this.dialogRef.close(budgetarys)
      })
    }
  }

  async verificar(){
    const id = this.data._id
    const existe = await this.usuariosService.verificationUsed(id).toPromise();
    console.log( existe?.verificado);
    
    if(this.FormBudgetary.get('activo')?.value == false){
      if(existe?.verificado == true){
        this.dialog.open(BudgetaryModalComponent);
        this.FormBudgetary.get('activo')?.setValue(true);
      }
    }
  }
}
