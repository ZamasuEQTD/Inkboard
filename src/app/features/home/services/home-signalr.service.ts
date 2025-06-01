import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Portada } from '../../hilos/interfaces/portada.interface';

@Injectable({
  providedIn: 'root'
})
export class HomeSignalrService {

  private hub? : signalR.HubConnection;


  start(onStart? : ()=>void ){
    if(this.hub) return;

    this.hub = new signalR.HubConnectionBuilder().withUrl('http://192.168.2.106:3000/hubs/home', {
      withCredentials:false
    }).build();

    this.hub.start().then(()=> {
      onStart && onStart();      
    });
  }


  stop(){
    if(!this.hub) return;

    this.hub.stop().then(()=> {
      this.hub = undefined;
    });
  }

  addOnHiloEliminadoListener(onHiloEliminado:(id:string)=> void){
    this.hub!.on("OnHiloEliminado", (data)=>{
      onHiloEliminado(data as string);
    })
  }

  addOnHiloPosteadoListener(on:(portada:Portada)=>void){
    this.hub!.on("OnHiloPosteado", (data : Portada)=> {
      on(data);
    })
  }
}
