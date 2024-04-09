import { Component, ViewChild } from '@angular/core';
import { OfficerService } from '../../services/officer.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { OfficerDialogComponent } from '../../dialogs/officer-dialog/officer-dialog.component';
import { RotationOfficerDialogComponent } from '../../dialogs/rotation-officer-dialog/rotation-officer-dialog.component';

@Component({
  selector: 'app-officers',
  templateUrl: './officers.component.html',
  styleUrls: ['./officers.component.css']
})
export class OfficersComponent {
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ['nombre', 'dni', 'cargo', 'telefono', 'activo', 'opciones']
  text: string = ''

  constructor(
    private funcionariosService: OfficerService,
    public dialog: MatDialog) {
  }
  
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.Get()
  }
  
  Get() {
    if (this.text !== '') {
      this.funcionariosService.search(this.text).subscribe(data => {
        this.dataSource = new MatTableDataSource(data.officers)
        this.dataSource.paginator = this.paginator;
      })
    }
    else {
      this.funcionariosService.get().subscribe(data => {
        this.dataSource = new MatTableDataSource(data.officers)
        this.dataSource.paginator = this.paginator;
      })
    }
  }

  Add() {
    const dialogRef = this.dialog.open(OfficerDialogComponent, {
      width: '1200px'
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.dataSource = new MatTableDataSource([result, ...this.dataSource.data])
        this.dataSource.paginator = this.paginator;
      }
    });

  }

  Edit(officer: any) {
    const dialogRef = this.dialog.open(OfficerDialogComponent, {
      width: '1200px',
      data: officer
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        const indexFound = this.dataSource.data.findIndex(officer => officer._id === result._id)
        this.dataSource.data[indexFound] = result
        this.dataSource = new MatTableDataSource(this.dataSource.data)
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  Rotation(officer: any) {
    const dialogRef = this.dialog.open(RotationOfficerDialogComponent, {
      width: '1000px',
      data: officer
    })
  }

  delete(officer: any) {
    this.funcionariosService.delete(officer._id).subscribe(newOfficer => {
      const indexFound = this.dataSource.data.findIndex(element => element._id === officer._id)
      this.dataSource.data[indexFound].activo = newOfficer.activo
      this.dataSource = new MatTableDataSource(this.dataSource.data)
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
}
