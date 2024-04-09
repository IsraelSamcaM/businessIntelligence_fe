import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url
@Injectable({
  providedIn: 'root'
})
export class OfficerService {
  constructor(private http: HttpClient) { }
  add(officer: any) {
    return this.http.post<any>(`${base_url}/officers`, officer).pipe(
      map(resp => resp)
    )
  }



  search(text: string) {
    return this.http.get<{ officers: any[], length: number }>(`${base_url}/officers/search/${text}`).pipe(
      map(resp => {
        return { officers: resp.officers, length: resp.length }
      })
    )
  }

  get() {
    return this.http.get<{ ok: boolean, officers: any[], length: number }>(`${base_url}/officers`).pipe(
      map(resp => {
        return { officers: resp.officers, length: resp.length }
      })  
    )
  }

  edit(id_officer: string, officer: any) {
    return this.http.put<any>(`${base_url}/officers/${id_officer}`, officer).pipe(
      map(resp => resp)
    )
  }

  delete(id_officer: string) {
    return this.http.delete<any>(`${base_url}/officers/${id_officer}`).pipe(
      map(resp => resp))
  }

}
