import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JobService } from '../../services/job.service';
import { LevelService } from '../../services/level.service';
import { BudgetaryService} from '../../services/budgetary.service.service'
import { DependenceServiceService} from '../../services/dependence.service.service'

@Component({
  selector: 'app-job-dialog',
  templateUrl: './job-dialog.component.html',
  styleUrls: ['./job-dialog.component.css']

})

export class JobDialogComponent {
  availablePartidas: any[] = []
  availableJobs: any[] = []
  noJob: boolean = false
  noPartida: boolean = false
  jobs: any[] = []
  dependentJobs: any[] = []
  tipoContrato: string
  niveles: any[] = []
  partidas: any[] = []
  
  secretarias: any[] = []
  jefaturas: any[] = []
  direcciones: any[] = []

  id_dependence_jef: string = ''
  id_dependence_dir: string = ''
  id_dependence_sec: string = ''

  selecionado: string = ''

  FormJob: FormGroup = this.fb.group({  
    nombre: ['', Validators.required],

    secretaria: [''],
    jefatura: [''],
    direccion: [''],

    nivel_id: ['', Validators.required],
    isRoot: [false, Validators.required],
    estado: ['ELIMINACION', Validators.required],
    tipoContrato: ['', Validators.required],
    superior: ['', Validators.required],
    dependencia_id:['', Validators.required],
    partida_id:['',Validators.required],
    denominacion:['',Validators.required],
    duracion_contrato:[0,Validators.required],
  }); 

  selectedOption: any;

  constructor(
    private cargoService: JobService,
    private levelService: LevelService,
    private BudgetaryService: BudgetaryService,
    private DependenceService:DependenceServiceService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<JobDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {


  }

  ngOnInit(): void {

    //console.log(this.data)
    
    this.levelService.get().subscribe(data=>{
      this.niveles=data.levels          
    })
    
    this.BudgetaryService.get().subscribe(data=>{
      this.partidas=data.budgetary          
    })

    this.DependenceService.getSecretarias().subscribe(data=>{
      this.secretarias = data.dependences        
    })

    if(this.id_dependence_jef !== ''){
      this.DependenceService.getByDependenceId(this.id_dependence_jef).subscribe(data=>{
        this.jefaturas = data.dependences        
      })
    }
    if(this.id_dependence_dir !== ''){
      this.DependenceService.getByDependenceId(this.id_dependence_dir).subscribe(data=>{
        this.direcciones = data.dependences        
      })
    }

    if (this.data) {
      const { nivel_id,superior, ...values } = this.data
       this.cargoService.getDependentsOfSuperior(this.data._id).subscribe(jobs => this.dependentJobs = jobs)
       this.FormJob.patchValue({ ...values, nivel_id: nivel_id._id })
       
       //console.log(this.data)
      if (!superior) {
        this.noJob = true
        this.FormJob.patchValue(values)
      }
      else {
        this.FormJob.patchValue({ ...values, superior: superior._id })
      }
     }
  }

  public mostrarBloque: boolean = false;

  searchDependents(text: string) {
    this.cargoService.searchSuperior(text).subscribe(jobs => {
      this.jobs = jobs
    })
  }

  save() {
    const newJob = {
      ...this.FormJob.value,
      dependents: this.dependentJobs.map(element => element._id)
    } 
    //console.log(newJob)

    if (this.data) {
      this.cargoService.edit(this.data._id, newJob).subscribe(job => this.dialogRef.close(job))
    }
    else {
      this.cargoService.add(newJob).subscribe(job => this.dialogRef.close(job))
    }
  }

  selectDependents(value: any) {
    const job = value
    if (this.dependentJobs.some(element => element._id === job._id)) return
    this.dependentJobs.unshift(job)
    this.jobs = []
  }

  removeDependentJob(position: number) {
    if (this.data) {
      const dependent = this.dependentJobs[position]
      this.cargoService.removeDependent(dependent._id).subscribe(_ => this.dependentJobs.splice(position, 1))
    }
    else {
      this.dependentJobs.splice(position, 1)
    }

  }
  
  nivelSeleccionado(event: any) {
    const selectedValue = event.value;
    console.log('Nivel seleccionado:', selectedValue);
  }

  secreSeleccionado(event: any) {
    this.direcciones = []
    const selectedValue = event.value;
    this.id_dependence_jef = selectedValue._id

    this.FormJob.get("secretaria")?.setValue(selectedValue.sigla)
    
    this.DependenceService.getByDependenceId(this.id_dependence_jef).subscribe(data=>{
      this.jefaturas = data.dependences        
    })
    this.selecionarDependencia(event.value)

    console.log('Secretaria seleccionado:', selectedValue);
  }


  selecionarDependencia(dependence: any) {
    this.FormJob.get("dependencia_id")?.setValue(dependence._id)
  }
 
  jefSeleccionado(event: any) {
    const selectedValue = event.value;
    this.id_dependence_jef = selectedValue._id

    this.FormJob.get("jefatura")?.setValue(selectedValue.sigla)

    this.DependenceService.getByDependenceId(this.id_dependence_jef).subscribe(data=>{
      this.direcciones = data.dependences        
    })
    this.selecionarDependencia(event.value)

    console.log('Jefatura seleccionado:', selectedValue);
  }

  direcSeleccionado(event: any) {
    const selectedValue = event.value;

    this.selecionarDependencia(event.value)

    this.FormJob.get("direccion")?.setValue(selectedValue.sigla)

    console.log('Direccion seleccionado:', selectedValue);
  }


  get isFormValid() {
    if (this.FormJob.get('tipoContrato')?.value === 'ITEM') {
      if (this.FormJob.valid) return true
    }
    return false
  }

  searchJob(value: any) {
    this.cargoService.searchJobForOfficer(value).subscribe(data => {
      this.availableJobs = data
    })
  }

  selectJob(job: any) {
    this.FormJob.get('superior')?.setValue(job._id)
  }

  removeJob() {
    if (this.noJob) {
      this.FormJob.removeControl('superior')
    }
    else {
      this.FormJob.addControl('superior', new FormControl(this.data?.superior ? this.data.superior._id : '', Validators.required))
    }
  }



  searchPartida(value: any) {
    this.BudgetaryService.searchPartidaForJob(value).subscribe(data => {
      this.availablePartidas = data
    })
  }

  selectPartida(bulgetary: any) {
    this.FormJob.get('partida_id')?.setValue(bulgetary._id)
  }

  removePartida() {
    if (this.noPartida) {
      this.FormJob.removeControl('partida_id')
    }
    else {
      this.FormJob.addControl('partida_id', new FormControl(this.data?.partida_id ? this.data.partida_id._id : '', Validators.required))
    }
  } 
  
  restablecerCombos(){
    this.FormJob.get("dependencia_id")?.setValue("")
    this.FormJob.get("secretaria")?.setValue("")
    this.FormJob.get("direccion")?.setValue("")
    this.FormJob.get("jefatura")?.setValue("")

    // this.secretarias= []
    this.jefaturas= []
    this. direcciones = []
    this.id_dependence_jef = ''
    this.id_dependence_dir = ''
    this.id_dependence_sec = ''
    
  }
  Edit(){}
}
