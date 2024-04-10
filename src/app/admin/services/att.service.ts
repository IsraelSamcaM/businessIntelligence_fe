import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class AttService {

  constructor(private http: HttpClient) {}

  get() {
    return this.http.get<{ levels: any[], length: number }>(`${base_url}/levels`).pipe(
      map(resp => {
        return { levels: resp.levels, length: resp.length }
      })
    )
  }
}

