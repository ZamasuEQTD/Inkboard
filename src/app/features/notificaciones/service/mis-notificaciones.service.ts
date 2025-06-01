import { inject, Injectable, signal } from '@angular/core';
import { Notificacion } from '../interfaces/notificacion.interface';
import { NotificacionesService } from './notificaciones.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MisNotificacionesService {

  inicializado = signal<boolean>(false)

  notificaciones = signal<Notificacion []>([])

  service = inject(NotificacionesService)

  constructor() { }

  cargarNotificaciones(){
    this.service.getNotificaciones(this.notificaciones().at(this.notificaciones().length)?.fecha).subscribe(
      (notificaciones) => {
        this.notificaciones.update((notis)=> [...notificaciones, ...notis])
      }
    );
  }

  leer(id: string) {
    return this.service.leerNotificacion(id).pipe(tap(()=> {
      this.notificaciones.update((notis) => notis.filter((n) => n.id !== id));
    }));
  }
}
