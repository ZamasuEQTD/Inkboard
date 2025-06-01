import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiResponse } from '../../application/interfaces/api-response.interface';
import { Portada } from '../interfaces/portada.interface';
import { map } from 'rxjs';
import { Hilo } from '../interfaces/hilo.interface';

@Injectable({
  providedIn: 'root'
})
export class HilosService {

  private readonly http = inject(HttpClient);
  
  eliminar(id: string) {
    return this.http.delete<ApiResponse<any>>("/api/hilos/eliminar/" + id);
  }

  getHilo(id: string) {
    return this.http
      .get<ApiResponse<Hilo>>(`/api/hilos/${id}`)
      .pipe(
        map((response) => response.data),
      );
  }

  getPortadas(query: GetPortadasQueryParams): import("rxjs").Observable<Portada[]> {
    return this.http.get<ApiResponse<Portada[]>>("/api/hilos", {
      params: {
        titulo: query.titulo ?? "",
        ultimaPortada: query.ultimaPortada ?? ''
      }
    }).pipe(map((response) => response.data));
  }

  establecerSticky(id:string){
    return this.http.post("/api/hilos/establecer-sticky/"+id, null);
  }

  eliminarSticky(id:string){
    return this.http.post("/api/hilos/eliminar-sticky/"+id, null);
  }
}

export interface GetPortadasQueryParams {
  titulo? :string
  ultimaPortada?:string
}

