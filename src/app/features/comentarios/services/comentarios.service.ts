import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  private readonly http = inject(HttpClient);

  eliminar(hilo:string, comentario:string) {
    return this.http.delete(`/api/comentarios/hilo/${hilo}/eliminar/comentario/${comentario}`);
  }

  destacar(hilo:string, comentario:string) {
    return this.http.post(`/api/comentarios/hilo/${hilo}/destacar/comentario/${comentario}`, {});
  }
}
