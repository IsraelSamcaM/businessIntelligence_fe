import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url
@Injectable({
  providedIn: 'root'
})
export class DependenceServiceService {

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<{ dependences: any[], length: number }>(`${base_url}/depedences`).pipe(
      map(resp => {
        return { dependences: resp.dependences, length: resp.length }
      })
    )
  }

  getSecretarias() {
    return this.http.get<{ dependences: any[], length: number }>(`${base_url}/depedences/secretarias`).pipe(
      map(resp => {
        return { dependences: resp.dependences, length: resp.length }
      })
    )
  }

  getByDependenceId(id_dependence: string) {
    return this.http.get<{ dependences: any[], length: number }>(`${base_url}/depedences/depende_de/${id_dependence}`).pipe(
      map(resp => {
        return { dependences: resp.dependences, length: resp.length }
      })
    )
  }

  edit(id_dependence: string, dependence: any) {
    return this.http.put<any>(`${base_url}/depedences/${id_dependence}`, dependence).pipe(
      map(resp => resp)
    )
  }
  
  add(dependence: any) {
    return this.http.post<any>(`${base_url}/depedences`, dependence).pipe(
      map(resp => resp)
    )
  }

  delete(id_dependence: string) {
    return this.http.delete<any>(`${base_url}/depedences/${id_dependence}`).pipe(
      map(resp => resp))
  }

  searchDependenceForDependence(text: string) {
    return this.http.get<any[]>(`${base_url}/depedences/search/dependence/${text}`).pipe(
      map(resp => resp)
    )
  }

  searchWithText(text: string) {
    return this.http.get<{ dependences: any[], length: number }>(`${base_url}/depedences/search/${text}`).pipe(
      map(resp => { 
        return { dependences: resp.dependences, length: resp.length }
      })
    )
  }

}
