import { Component, OnInit ,ViewChild, Inject} from '@angular/core';
import { RotationService} from '../../services/rotation.service'
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-rotation-officer-dialog',
  templateUrl: './rotation-officer-dialog.component.html',
  styleUrls: ['./rotation-officer-dialog.component.css']
})

export class RotationOfficerDialogComponent{
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ['cargos', 'fecha', 'hora'] 
  
  numRotation: number = 0;

  constructor(
    private rotacionServicio: RotationService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.Get()
  }

  Get(){
    this.rotacionServicio.getRegistrosFun(this.data._id).subscribe(data => {
      this.dataSource = new MatTableDataSource(data.rotations)
      this.numRotation = data.rotations.length
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource.data)
      console.log("las rotaciones son :  " +this.numRotation)
    })
  }

}
