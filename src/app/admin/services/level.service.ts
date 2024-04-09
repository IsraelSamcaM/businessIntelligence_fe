import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class LevelService {

  constructor(private http: HttpClient) { }
  
  get() {
    return this.http.get<{ levels: any[], length: number }>(`${base_url}/levels`).pipe(
      map(resp => {
        return { levels: resp.levels, length: resp.length }
      })
    )
  }

  edit(id_level: string, level: any) {
    return this.http.put<any>(`${base_url}/levels/${id_level}`, level).pipe(
      map(resp => resp)
    )
  }
  
  add(level: any) {
    return this.http.post<any>(`${base_url}/levels`, level).pipe(
      map(resp => resp)
    )
  }

  delete(id_level: string) {
    return this.http.delete<any>(`${base_url}/levels/${id_level}`).pipe(
      map(resp => resp))
  }

}
