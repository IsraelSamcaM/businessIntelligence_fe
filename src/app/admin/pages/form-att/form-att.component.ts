import { Component, OnInit , ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OfficerService } from '../../services/officer.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-form-att',
  templateUrl: './form-att.component.html',
  styleUrls: ['./form-att.component.css'],
  
})
export class FormAttComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<any>([]);
  FormAtt: FormGroup;
  text: string = ''
  displayedColumns = ['nombre', 'estado', 'options']

  constructor(
    private fb: FormBuilder,
    private funcionariosService: OfficerService,
  ) {
  }

  ngOnInit() {
    this.FormAtt = this.fb.group({
      horas: ['24', Validators.required]
    });
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

  applyFilter(event: Event) {
    this.text = (event.target as HTMLInputElement).value;
    this.Get()
  }

  cancelSearch() {
    this.text = ''
    this.Get()
  }
  Descargar(fecha: any) {
  }
  Eliminar(fecha: any) {
  }

  Guardar(){}

}
