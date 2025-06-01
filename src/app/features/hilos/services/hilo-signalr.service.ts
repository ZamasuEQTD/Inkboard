import { Injectable, signal } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Comentario } from '../../comentarios/interface/comentario.interface';

@Injectable({
  providedIn: 'root'
})
export class HiloSignalrService {
  private hub? : signalR.HubConnection;

  onHiloComentado = signal<Comentario | undefined>(undefined);

  onComentarioEliminado = signal<string | undefined>(undefined);

  start(id:string, onStart? : ()=>void ):void {  
     if(this.hub) return;
    
        this.hub = new signalR.HubConnectionBuilder().withUrl('http://192.168.2.106:3000/hubs/hilos', {
          withCredentials:false
        }).build();
    
        this.hub.start().then(()=> {

        onStart && onStart();      
      
        this.hub?.invoke("SubscribirseHilo", id).then(()=>{
          
          this.hub?.on("OnComentarioEliminado", (data:string)=> {
            this.onComentarioEliminado.set(data);
          });
  
        }).catch(err => console.error(err));;

        this.hub?.on("OnHiloComentado", (data:Comentario)=> {
          this.onHiloComentado.set(data);
        });
  
      }
    );
  }

  stop(): void {
    if(!this.hub) return;
    this.hub.stop().then(()=> {
      this.hub = undefined;
    });
  }
}
