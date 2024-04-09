import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class BudgetaryService{

  constructor(private http: HttpClient) { }
  get() {
    return this.http.get<{ budgetarys: any[], length: number }>(`${base_url}/budgetarys`).pipe(
      map(resp => {
        return { budgetary: resp.budgetarys, length: resp.length }
      })
    )
  }

  searchPartidaForJob(text: string) {
    return this.http.get<any[]>(`${base_url}/budgetarys/forjob/${text}`).pipe(
      map(resp => resp)
    )
  }

  edit(id_budgetary: string, budgetary: any) {
    return this.http.put<any>(`${base_url}/budgetarys/${id_budgetary}`, budgetary).pipe(
      map(resp => resp)
    )
  }
  
  add(budgetary: any) {
    return this.http.post<any>(`${base_url}/budgetarys`, budgetary).pipe(
      map(resp => resp)
    )
  }

  delete(id_budgetary: string) {
    return this.http.delete<any>(`${base_url}/budgetarys/${id_budgetary}`).pipe(
      map(resp => resp))
  }

  searchWithText(text: string) {
    return this.http.get<{ budgetarys: any[], length: number }>(`${base_url}/budgetarys/search/${text}`).pipe(
      map(resp => { 
        return { budgetarys: resp.budgetarys, length: resp.length }
      })
    )
  }

  verificationUsed(id: string) {
    return this.http.get<{ existe: boolean }>(`${base_url}/budgetarys/verification/${id}`).pipe(
      map(resp => { 
        return { verificado: resp.existe}
      })
    )
  }

}
