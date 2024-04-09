import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})

export class RotationService {
  constructor(private http: HttpClient){}

  get() {
    return this.http.get<{ rotations: any[], length: number }>(`${base_url}/rotations`).pipe(
      map(resp => {
        return { rotations: resp.rotations, length: resp.length }
      })
    )
  }

  getRegistrosFun(funcionario_id: string) {
    return this.http.get<{ rotations: any[]}>(`${base_url}/rotations/rotation_fun/${funcionario_id}`)
  }

  getRegistrosCar(funcionario_id: string) {
    return this.http.get<{ rotations: any[]}>(`${base_url}/rotations/rotation_car/${funcionario_id}`)
  }


  edit(id_rotation: string,   rotation: any) {
    return this.http.put<any>(`${base_url}/rotations/${id_rotation}`, rotation).pipe(
      map(resp => resp)
    )
  }
  
  add(rotation: any) {
    return this.http.post<any>(`${base_url}/rotations`, rotation).pipe(
      map(resp => resp)
    )
  }
}
