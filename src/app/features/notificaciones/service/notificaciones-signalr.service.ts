import { inject, Injectable, signal } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Notificacion } from '../interfaces/notificacion.interface';
import { AuthService } from '../../auth/services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class NotificacionesSignalrService {
  
  onNotificacionRecibida = signal<Notificacion | undefined>(undefined)

  private hub? : signalR.HubConnection;
  
  private auth = inject(AuthService)

  start(onStart? : ()=>void ) {
    if(this.hub) return;
    
    this.hub = new signalR.HubConnectionBuilder().withUrl('http://192.168.2.106:3000/hubs/notificaciones', {
      withCredentials: false,
      accessTokenFactory: () => this.auth.token() ?? ''
    }).build();
  
    this.hub.start().then(()=> {
      onStart && onStart();  

      this.hub?.on('OnNotificacionRecibida', (notificacion: Notificacion) => {
        this.onNotificacionRecibida.set(notificacion);
      }
      );
    });
  }
  

  stop(){
    if(!this.hub) return;

    this.hub.stop().then(() => {
      this.hub = undefined;
    });
  }

  constructor() { }

}
