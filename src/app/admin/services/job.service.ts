import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url
@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) { }

  searchJobForOfficer(text: string) {
    return this.http.get<any[]>(`${base_url}/jobs/search/job/officer/${text}`).pipe(
      map(resp => resp)
    )
  }

  searchSuperior(text: string) {
    return this.http.get<any[]>(`${base_url}/jobs/search/dependents/${text}`).pipe(
      map(resp => resp)
    )
  }
  getDependentsOfSuperior(id_superior: string) {
    return this.http.get<any[]>(`${base_url}/jobs/dependents/${id_superior}`).pipe(
      map(resp => resp)
    )
  }
  removeDependent(id_dependent: string) {
    return this.http.delete<any>(`${base_url}/jobs/dependent/${id_dependent}`).pipe(
      map(resp => resp)
    )
  }

  get() {
    return this.http.get<{ jobs: any[], length: number }>(`${base_url}/jobs`).pipe(
      map(resp => {
        return { jobs: resp.jobs, length: resp.length }
      })
    )
  }
  
  //para los que no estas presentes en algun organigrana
  getNoOrganigram() {
    return this.http.get<{ jobs: any[], length: number }>(`${base_url}/jobs/noOrganigram`).pipe(
      map(resp => {
        return { jobs: resp.jobs, length: resp.length }
      })
    )
  }

//metodo de escala salarial 
  getEscalaSalarial() {
    return this.http.get<{ salarios: any[], length: number }>(`${base_url}/jobs/escala`).pipe(
      map(resp => {
        return { salarys: resp.salarios, length: resp.length }
      })
    )
  }

  //metodo de total escala salarial 
  getTotalEscalaSalarial() {
    return this.http.get<{ totalSalarios: any[], length: number }>(`${base_url}/jobs/totalEscala`).pipe(
      map(resp => {
        return { totalSalarys: resp.totalSalarios, length: resp.length }
      })
    )
  }
  
  //metodo de global de eventuales 
  getTotalEscalaSalarialTotal() {
    return this.http.get<{ totalSalariosPartidaTotal: any[], length: number }>(`${base_url}/jobs/escalaPartidaPresupuestariaTotal`).pipe(
      map(resp => {
        return { totalSalarysEventualGlobal: resp.totalSalariosPartidaTotal, length: resp.length }
      })
    )
  }

  //metodo de global de items  
  getGlobalItemSalariosTotal() {
    return this.http.get<{ globalSalariosItemTotal: any[], length: number }>(`${base_url}/consults/totalGlobalItems`).pipe(
      map(resp => {
        return { globalSalarysItemTotal: resp.globalSalariosItemTotal, length: resp.length }
      })
    )
  }

  //metodo de global de eventuales  
  getGlobalEventualSalariosTotal() {
    return this.http.get<{ globalSalariosItemTotal: any[], length: number }>(`${base_url}/consults/totalGlobalEventuales`).pipe(
      map(resp => {
        return { globalSalarysEventualesTotal: resp.globalSalariosItemTotal, length: resp.length }
      })
    )
  }

  /* get total de items*/ 
  getFullItems() {
    return this.http.get<{ fullItemsTable: any[], length: number }>(`${base_url}/consults/fullItemsTable`).pipe(
      map(resp => {
        return { fullItems: resp.fullItemsTable, length: resp.length }
      })
    )
  }
  /* get total de eventuales*/ 
    getFullEventuales() {
    return this.http.get<{ fullEventualesTable: any[], length: number }>(`${base_url}/consults/fullEventualesTable`).pipe(
      map(resp => {
        return { fullEventuales: resp.fullEventualesTable, length: resp.length }
      })
    )
  }

  /* get total por secretarias*/ 
  getFullSecretarias() {
    return this.http.get<{ fullSalariosSecretarias: any[], length: number }>(`${base_url}/consults/fullSecretarias`).pipe(
      map(resp => {
        return { fullSecretarias: resp.fullSalariosSecretarias, length: resp.length }
      })
    )
  }
  /* get global por secretarias*/ 
  getGlobalSecretarias() {
    return this.http.get<{ globalSalariosSecretarias: any[], length: number }>(`${base_url}/consults/globalSecretarias`).pipe(
      map(resp => {
        return { globalSecretarias: resp.globalSalariosSecretarias, length: resp.length }
      })
    )
  }

  /* get tabla por partidas presupuestarias*/ 
  getFullPartidas() {
    return this.http.get<{ fullSalariosPartidas: any[], length: number }>(`${base_url}/consults/fullPartidas`).pipe(
      map(resp => {
        return { fullPartidas: resp.fullSalariosPartidas, length: resp.length }
      })
    )
  }
  /* get totales por partidas presupuestarias*/ 
  getGlobalPartidas() {
    return this.http.get<{ globalSalariosPartidas: any[], length: number }>(`${base_url}/consults/globalPartidas`).pipe(
      map(resp => {
        return { globalPartidas: resp.globalSalariosPartidas, length: resp.length }
      })
    )
  }

  //metodo de total escala salarial por partida presupuestaria
  getEscalaSalarialPartidaPresupuestaria() {
    return this.http.get<{ totalSalariosPartida: any[], length: number }>(`${base_url}/jobs/escalaPartidaPresupuestaria`).pipe(
      map(resp => {
        return { totalSalarysPartida: resp.totalSalariosPartida, length: resp.length }
      })
    )
  }

  searchWithText(text: string) {
    return this.http.get<{ jobs: any[], length: number }>(`${base_url}/jobs/search/${text}`).pipe(
      map(resp => { 
        return { jobs: resp.jobs, length: resp.length }
      })
    )
  }

  searchWithFullCombo(level: string, estado: string) {
    return this.http.get<{ jobs: any[], length: number }>(`${base_url}/jobs/fullCombo/${level}/${estado}`).pipe(
      map(resp => { 
        return { jobs: resp.jobs, length: resp.length }
      })
    )
  }
 
  search(level: string) {
    return this.http.get<{ jobs: any[], length: number }>(`${base_url}/jobs/${level}`).pipe(
      map(resp => {
        return { jobs: resp.jobs, length: resp.length }
      })
    )
  }

  add(job: any) {
    return this.http.post<any>(`${base_url}/jobs`, job).pipe(
      map(resp => resp)
    )
  }
  edit(id: string, job: any,) {
    return this.http.put<any>(`${base_url}/jobs/${id}`,   job).pipe(
      map(resp =>resp)
    )
  }

  getOrganization() {
    return this.http.get<{organigrama:any[],tags:any}>(`${base_url}/jobs/organization/data`).pipe(
      map(resp => {
        console.log(resp)
        const newOrg=resp.organigrama.map(el => {         
          el.data.forEach((item: any, index: number) => {
            
            if(item.estado =="ITEM"){
              el.data[index].tags=['item']
            }
            else if(item.estado =="EVENTUAL"){
              el.data[index].tags=['eventual']
            }
            else if(item.estado =="ASCENSO"){
              el.data[index].tags=['ascenso']
            }
            else if(item.estado =="CREACION"){
              el.data[index].tags=['creacion']
            }
            else if(item.estado =="REUBICACION"){
              el.data[index].tags=['reubicacion']
            }
            else if(item.estado =="DESCENSO"){
              el.data[index].tags=['descenso']
            }
            else if(item.estado =="ELIMINACION"){
              el.data[index].tags=['eliminacion']
            }
          })
          return el
        })

        console.log(resp.organigrama)
        return {organigrama:resp.organigrama,tags:resp.tags}
      })
    )
  }
}

