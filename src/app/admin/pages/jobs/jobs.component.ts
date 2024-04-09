import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { JobService } from '../../services/job.service';
import { LevelService } from '../../services/level.service';
import { MatDialog } from '@angular/material/dialog';
import { JobDialogComponent } from '../../dialogs/job-dialog/job-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { RotationJobDialogComponent } from '../../dialogs/rotation-job-dialog/rotation-job-dialog.component';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements AfterViewInit {
   
  text: string = ''
  level: string = 'noneLevel'
  estado: string = 'noneEstado'
  displayedColumns = ['nombre','secretaria','tipoContrato','funcionario','nivel_id.nivel','estado','superior','options']
  dataSource = new MatTableDataSource<any>([]);
  niveles: any[] = []
  filterEstado = "noneEstado"
  filterLevel = "noneLevel"
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private cargoService: JobService,
    private levelService: LevelService,
    public dialog: MatDialog,
  ) 
  
  {
    this.Get()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.levelService.get().subscribe(data=>{ this.niveles=data.levels})
  }

  Get() {
    if (this.text !== '') {
      this.cargoService.searchWithText(this.text).subscribe(data => {
        this.dataSource = new MatTableDataSource(data.jobs)
        this.dataSource.paginator = this.paginator;
      })
    }
    else {
      this.cargoService.get().subscribe(data => {
        this.dataSource = new MatTableDataSource(data.jobs)
        this.dataSource.paginator = this.paginator;
      })
    }
  }


  GetJobsLevelEstado(){
    if(this.level !== 'noneLevel' || this.estado !== 'noneEstado'){
      this.cargoService.searchWithFullCombo(this.level, this.estado).subscribe(data => {
        this.dataSource = new MatTableDataSource(data.jobs)
        this.dataSource.paginator = this.paginator;
      })
    }

    else {
      this.cargoService.get().subscribe(data => {
        this.dataSource = new MatTableDataSource(data.jobs)
        this.dataSource.paginator = this.paginator;
      })
    }
  }

  Edit(item: any) {
    const dialogRef = this.dialog.open(JobDialogComponent, {
      width: '770px',
      data: item
    });

    dialogRef.afterClosed().subscribe((result: any) => {

      if (result) {
        result.funcionario = item.funcionario
        const index = this.dataSource.data.findIndex(element => element._id === result._id);
        this.dataSource.data[index] = result
        this.dataSource = new MatTableDataSource(this.dataSource.data)
        this.dataSource.paginator = this.paginator;
        //console.log(result)
      }
    });
  }

  add() {
    const dialogRef = this.dialog.open(JobDialogComponent, {
      width: '770px'
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.dataSource = new MatTableDataSource([result, ...this.dataSource.data])
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  applyFilter(event: Event) {
    this.text = (event.target as HTMLInputElement).value;
    this.Get()
  }

  cancelSearch() {
    this.text = ''
    this.Get()
  }


  estadoSelecionado(event: any){
    const selectedValue = event.value;
    this.estado = selectedValue
    console.log('Estado seleccionado:', selectedValue);
    this.GetJobsLevelEstado()
  }

  nivelSeleccionado(event: any) {
    const selectedValue = event.value;
    this.level = selectedValue
    console.log('Nivel seleccionado:', selectedValue);
    this.GetJobsLevelEstado()
  }

  Rotation(item: any) {
    const dialogRef = this.dialog.open(RotationJobDialogComponent, {
      width: '1000px',
      data: item
    })
  }
}
