import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Notificacion } from '../interfaces/notificacion.interface';
import { ApiResponse } from '../../application/interfaces/api-response.interface';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  constructor() { }

  private readonly http = inject(HttpClient)


  getNotificaciones(){
    return this.http.get<ApiResponse<Notificacion[]>>('/api/notificaciones').pipe(map((response) => response.data));
  }

  leerNotificacion(id:string){
    return this.http.post(`/api/notificaciones/${id}/leer`, null)
  }

  leerTodasLasNotificaciones(){
    return this.http.post(`/api/notificaciones/leer`, null)
  }
}
