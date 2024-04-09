
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { LevelService} from '../../services/level.service';
import { MatDialog } from '@angular/material/dialog';
import { JobDialogComponent } from '../../dialogs/job-dialog/job-dialog.component';
import { LevelDialogComponent } from '../../dialogs/level-dialog/level-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


//import { JobService } from '../../services/job.service';



@Component({
  selector: 'app-levels',
  templateUrl: './levels.component.html', 
  styleUrls: ['./levels.component.css']
})
export class LevelsComponent implements AfterViewInit {
  text: string = ''
  displayedColumns = ['nivel','sueldo','cajaSalud','solidario','profecional','proVivienda','options']
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private LevelService: LevelService,
    public dialog: MatDialog,
  ) 
  
  {
    this.Get()
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  Get() {
      this.LevelService.get().subscribe(data => {
        this.dataSource = new MatTableDataSource(data.levels)
        this.dataSource.paginator = this.paginator;
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
  
  Edit(item: any) {
    const dialogRef = this.dialog.open(LevelDialogComponent, {
      width: '800px',
      data: item
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        const index = this.dataSource.data.findIndex(element => element._id === result._id);
        this.dataSource.data[index] = result
        this.dataSource = new MatTableDataSource(this.dataSource.data)
        this.dataSource.paginator = this.paginator;
      }
    });
  }
  add() {
    const dialogRef = this.dialog.open(LevelDialogComponent, {
      width: '800px'
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.dataSource = new MatTableDataSource([result, ...this.dataSource.data])
        this.dataSource.paginator = this.paginator;
      }
    })
  }

 
  delete(level: any) {
    this.LevelService.delete(level._id).subscribe(() => {
      const indexFound = this.dataSource.data.findIndex((element: any) => element._id === level._id);
      if (indexFound !== -1) {
        this.dataSource.data.splice(indexFound, 1); // Eliminar el elemento del array de datos
        this.dataSource = new MatTableDataSource(this.dataSource.data); // Actualizar la fuente de datos
        this.dataSource.paginator = this.paginator; // Actualizar el paginador si es necesario
      }
    });
  }
  

}