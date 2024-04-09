
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LevelService } from '../../services/level.service';
import { Component , Inject} from '@angular/core';

@Component({
  selector: 'app-level-dialog',
  templateUrl: './level-dialog.component.html',
  styleUrls: ['./level-dialog.component.css']
})
export class LevelDialogComponent {
  levels: any[] = []
  FormLevel: FormGroup = this.fb.group({
    nivel: ['', Validators.required],
    sueldo: ['', Validators.required],
    cajaSalud: ['', Validators.required],
    solidario: ['', Validators.required],
    profecional: ['', Validators.required],
    proVivienda: ['', Validators.required],
  }); 
  
  constructor(
    private nivelService: LevelService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<LevelDialogComponent>,
    private usuariosService: LevelService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    if (this.data) {
      this.FormLevel.patchValue(this.data)
      console.log(this.data)
    }
  }

  guardar() {
    if (this.data) {  
      this.usuariosService.edit(this.data._id, this.FormLevel.value).subscribe(levels => {
        this.dialogRef.close(levels);
      })
    }
    else {
      this.usuariosService.add(this.FormLevel.value).subscribe(levels => {
        this.dialogRef.close(levels)
      })
    }
  }
}
