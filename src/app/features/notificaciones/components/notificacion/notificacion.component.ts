import { Component, input, output } from '@angular/core';
import { Notificacion } from '../../interfaces/notificacion.interface';
import { TiempoTranscurridoPipe } from "../../../application/pipes/tiempoTranscurrido.pipe";

@Component({
  selector: 'app-notificacion',
  imports: [TiempoTranscurridoPipe],
  templateUrl: './notificacion.component.html',
  styleUrl: './notificacion.component.css',
})
export class NotificacionComponent { 
  notificacion = input.required<Notificacion>();

  onTap = output<void>();

  static TIPOS_NOTIFICACION : Map<string, string> = new Map<string, string>([
    ['ComentarioRespondido', 'Han respondido tu comentario'],
    ['HiloComentado', 'Han comentado tu hilo'],
    ['HiloSeguidoComentado', 'Han comentado un hilo que sigues'],
  ])
  get tipo () : string {
    return NotificacionComponent.TIPOS_NOTIFICACION.get(this.notificacion().tipo) || 'Notificación desconocida';
  }
}
