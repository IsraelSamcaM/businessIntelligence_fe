
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { DependenceServiceService} from '../../services/dependence.service.service';
import { MatDialog } from '@angular/material/dialog';
import { DependencesDialogComponent } from '../../dialogs/dependences-dialog/dependences-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-dependences',
  templateUrl: './dependences.component.html',
  styleUrls: ['./dependences.component.css']
})
export class DependencesComponent implements AfterViewInit {
  text: string = ''
  displayedColumns = ['nombre','sigla','encargado','depende_de','tipo','estado','options']
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private DependenceService: DependenceServiceService,
    public dialog: MatDialog,
  ) 
  
  {
    this.Get()
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  Get() {
    if(this.text !== ''){
      this.DependenceService.searchWithText(this.text).subscribe(data => {
        this.dataSource = new MatTableDataSource(data.dependences)
        this.dataSource.paginator = this.paginator;
      })
    }else{
      this.DependenceService.get().subscribe(data => {
        this.dataSource = new MatTableDataSource(data.dependences)
        this.dataSource.paginator = this.paginator;
      })
    }  
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
    const dialogRef = this.dialog.open(DependencesDialogComponent, {
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
    const dialogRef = this.dialog.open(DependencesDialogComponent, {
      width: '800px'
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.dataSource = new MatTableDataSource([result, ...this.dataSource.data])
        this.dataSource.paginator = this.paginator;
      }
    })
  }

 
  delete(dependence: any) {
    this.DependenceService.delete(dependence._id).subscribe(() => {
      const indexFound = this.dataSource.data.findIndex((element: any) => element._id === dependence._id);
      if (indexFound !== -1) {
        this.dataSource.data.splice(indexFound, 1); 
        this.dataSource = new MatTableDataSource(this.dataSource.data); 
        this.dataSource.paginator = this.paginator;
      }
    });
  }

}
