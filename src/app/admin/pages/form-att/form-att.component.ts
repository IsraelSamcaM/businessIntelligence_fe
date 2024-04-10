import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OfficerService } from '../../services/officer.service';
import { AttService } from '../../services/att.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import * as XLSX from 'xlsx';

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
    private funcionariosService: OfficerService,
    private AttServices: AttService
  ) { 
    // Inicializar el formulario en el constructor
    this.FormAtt = this.fb.group({
      horas: ['', Validators.required],
      dateRange: ['', Validators.required],
      ejecutando: [false]
    });
  }

  ngAfterViewInit() {
    
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    
    const storedDataSource = localStorage.getItem('dataSource');
    if (storedDataSource) {
      this.dataSource.data = JSON.parse(storedDataSource);
      this.dataSource.paginator = this.paginator;
    }
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

  DescargarJson(fecha: any) {
    const fec = fecha.fecha_hora
    const fechasxs = '2024-04-10T03:26:39.472Z';

    this.AttServices.getFecha(fec).subscribe((data) => {
      if (data && data.datas) {
        const jsonData = JSON.stringify(data.datas);
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'datos.json';
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        console.log('No hay datos para descargar.');
      }
    });
  }

  DescargarExcel(fecha: any) {
    const fec = fecha.fecha_hora
    const fechasxs = '2024-04-10T03:26:39.472Z';
    this.AttServices.getFecha(fec).subscribe((data) => {
      console.log(data.datas)
      if (data && data.datas) {
        const datos = data.datas.map(item => ({
          ID_TARIFA: item.ID_TARIFA,
          NOMBRE_COMERCIAL: item.NOMBRE_COMERCIAL,
          ANCHO_BANDA_BAJADA: item.ANCHO_BANDA_BAJADA,
          ANCHO_BANDA_SUBIDA: item.ANCHO_BANDA_SUBIDA,
          COSTO_INSTALACION: item.COSTO_INSTALACION,
          DENOMINACION_TECNOLOGIA: item.DENOMINACION_TECNOLOGIA,
          DEPARTAMENTO: item.DEPARTAMENTO,
          FECHA_AGREGACION: new Date(item.FECHA_AGREGACION).toLocaleDateString(),
          NOMBRE_TARIFA_PLAN: item.NOMBRE_TARIFA_PLAN,
          PRECIO_MENSUAL: item.PRECIO_MENSUAL,
          RAZON_SOCIAL: item.RAZON_SOCIAL,
          TIPO_PAGO: item.TIPO_PAGO,
        }));

        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(datos);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');

        const nombreArchivo = 'datos.xlsx';
        XLSX.writeFile(workbook, nombreArchivo);

        // Actualizar paginador después de descargar los datos
        this.dataSource.paginator = this.paginator;
      } else {
        console.log('No hay datos para descargar.');
      }
    });
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
        this.registrar();
        this.intervaloID = setInterval(() => {
          this.registrar();
        }, intervaloMinutos);
  
        this.ejecutando = true;
        this.FormAtt.get('horas')?.disable();
      } else {
        console.log('El valor de horas es null o undefined');
      }
    }
  }
  
  registrar() {
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
    localStorage.setItem('dataSource', JSON.stringify(this.dataSource.data));

    this.AttServices.postFecha(registro.fecha_hora).subscribe(
      response => {
        console.log('Registro enviado al servidor:', response);
      },
      error => {
        console.error('Error al enviar el registro al servidor:', error);
      }
    );

    this.dataSource.paginator = this.paginator;
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
