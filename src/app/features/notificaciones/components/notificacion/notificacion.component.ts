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
}
