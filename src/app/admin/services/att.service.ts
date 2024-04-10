import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class AttService {

  constructor(private http: HttpClient) {}

  getFecha(text: string) {
    return this.http.get<{ ok: boolean, data: any[], length: number }>(`${base_url}/att/${text}`).pipe(
      map(resp => {
        return { datas: resp.data, length: resp.length }
      })  
    )
  }

  postFecha(text: string): Observable<any> {
    const data = { FECHA_AGREGACION: text }
    return this.http.post<any>(`${base_url}/att`, data);
  }
}

