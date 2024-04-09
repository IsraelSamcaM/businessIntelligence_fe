import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DependenceServiceService } from '../../services/dependence.service.service';
import { Component , Inject} from '@angular/core';
import { JobService } from '../../services/job.service';


@Component({
  selector: 'app-dependences-dialog',
  templateUrl: './dependences-dialog.component.html',
  styleUrls: ['./dependences-dialog.component.css']
})
export class DependencesDialogComponent {
  availableJobs: any[] = []
  availableDependences: any[] = []
  noJob: boolean = false
  noDependence: boolean = false
  dependences: any[] = []

  FormDependence: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    depende_de: ['', Validators.required],
    sigla: ['', Validators.required],
    encargado: ['', Validators.required],
    estado: [true, Validators.required],
    tipo: ['', Validators.required],
  }); 

  
  constructor(
    private cargoService: JobService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DependencesDialogComponent>,
    private usuariosService: DependenceServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    if (this.data) {
      this.FormDependence.patchValue(this.data)
      console.log(this.data)
    }
  }

  guardar() {
    if (this.data) {  
      this.usuariosService.edit(this.data._id, this.FormDependence.value).subscribe(dependences=> {
        this.dialogRef.close(dependences);
      })
    }
    else {
      this.usuariosService.add(this.FormDependence.value).subscribe(dependences => {
        this.dialogRef.close(dependences)
      })
    }
  }

  searchJob(value: any) {
    this.cargoService.searchJobForOfficer(value).subscribe(data => {
      this.availableJobs = data
    })
  }

  selectJob(job: any) {
    this.FormDependence.get('encargado')?.setValue(job._id)
  }

  removeJob() {
    if (this.noJob) {
      this.FormDependence.removeControl('encargado')
    }
    else {
      this.FormDependence.addControl('encargado', new FormControl(this.data?.encargado ? this.data.encargado._id : '', Validators.required))
    }
  }

  searchDependence(value: any) {
    this.usuariosService.searchDependenceForDependence(value).subscribe(data => {
      this.availableDependences = data
    })
  }
  
  selectDependence(dependence: any) {
    this.FormDependence.get('depende_de')?.setValue(dependence._id)  
  }

  removeDependence() {
    if (this.noDependence) {
      this.FormDependence.removeControl('depende_de')
    }
    else {
      this.FormDependence.addControl('depende_de', new FormControl(this.data?.depende_de ? this.data.depende_de._id : '', Validators.required))
    }
  }
}
