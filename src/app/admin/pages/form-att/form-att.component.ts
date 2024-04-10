import { Component, OnInit, ViewChild } from '@angular/core';
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
  text: string = '';
  displayedColumns = ['fecha', 'hora', 'options'];

  intervaloID: any;
  ejecutando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private funcionariosService: OfficerService
  ) {}

  ngOnInit() {
    this.FormAtt = this.fb.group({
      horas: ['24', Validators.required],
      dateRange: ['', Validators.required] 
    });
    this.Get();
  }

  Get() {
    if (this.text !== '') {
      this.funcionariosService.search(this.text).subscribe((data) => {
        this.dataSource = new MatTableDataSource(data.officers);
        this.dataSource.paginator = this.paginator;
      });
    } else {
      this.funcionariosService.get().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data.officers);
        this.dataSource.paginator = this.paginator;
      });
    }
  }

  applyFilter(event: Event) {
    this.text = (event.target as HTMLInputElement).value;
    this.Get();
  }

  cancelSearch() {
    this.text = '';
    this.Get();
  }

  DescargarJson(fecha: any) {
    console.log(fecha)
    
  }

  DescargarExcel(fecha: any) {
    console.log(fecha)
  }

  toggleComenzar() {
    const horasValue = this.FormAtt.get('horas')?.value;
  
    if (this.ejecutando) {
      clearInterval(this.intervaloID);
      this.ejecutando = false;
      this.FormAtt.get('horas')?.enable();
    } else {
      if (horasValue !== null && horasValue !== undefined) {
        const intervaloMinutos = horasValue * 60 * 1000; 
        this.intervaloID = setInterval(() => {
          const now = new Date();
          const fecha = this.formatDate(now);
          const fechaHora = now.toISOString(); 
          const registro = {
            fecha: fecha,
            hora: now.toLocaleTimeString(), 
            fecha_hora: fechaHora 
          };
         
          this.dataSource.data.push(registro); 
          this.dataSource._updateChangeSubscription(); 
          console.log('Nuevo registro:', registro);
        }, intervaloMinutos);
  
        this.ejecutando = true;
        this.FormAtt.get('horas')?.disable();
      } else {
        console.log('El valor de horas es null o undefined');
      }
    }
  }

  formatDate(date: Date): string {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    return `${formattedMonth}-${formattedDay}-${year}`;
  }

}
