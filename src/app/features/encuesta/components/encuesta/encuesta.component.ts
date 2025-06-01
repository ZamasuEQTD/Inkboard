import { Component, computed, inject, model, OnInit, output, signal } from '@angular/core';
import { Encuesta } from '../../interfaces/encuesta.interface';
import { HttpClient } from '@angular/common/http';
import * as signalR from '@microsoft/signalr';
@Component({
  selector: 'app-encuesta',
  imports: [],
  templateUrl: './encuesta.component.html',
  styleUrl: './encuesta.component.css',
})
export class EncuestaComponent implements OnInit {
  ngOnInit(): void {
      const hub = new signalR.HubConnectionBuilder().withUrl('http://192.168.2.106:3000/hubs/encuestas', {
        withCredentials:false
      }).build();
      
      hub.start().then(()=> {
        hub.invoke("Unirse", this.encuesta().id).then(()=>{
          hub.on("OnEncuestaVotada", (respuesta: string) => {
            this.encuesta.update((encuesta) => {
              return {
                ...encuesta,
                respuestas : encuesta.respuestas.map((r) => {
                  if(r.id == respuesta) {
                    return {
                      ...r,
                      votos: r.votos + 1,
                    }
                  }
                  return r;
                }),
              };
            });
          });
        }).catch(err => console.error(err));
      });
  }
  encuesta = model.required<Encuesta>();

  opcionSeleccionada = signal<string | undefined>(undefined);

  votosTotales = computed<number>(() => this.encuesta().respuestas.reduce((acc, respuesta) => acc + respuesta.votos, 0));

  onOpcionVotada = output<string>()

  private http = inject(HttpClient);

  seleccionarOpcion(opcion: string) {
    if(this.encuesta().respuesta_votada) return;

    if (opcion == this.opcionSeleccionada()) {
      this.opcionSeleccionada.set(undefined);

      return;
    }

    this.opcionSeleccionada.set(opcion)
  }

  estaSeleccionado(opcion: string): boolean {
    return this.opcionSeleccionada() === opcion;
  }

  votar(): void {
    if(!this.opcionSeleccionada()) return;
    
    this.http.post(`/api/encuestas/votar/encuesta/${this.encuesta().id}/respuesta/${this.opcionSeleccionada()}`, {}).subscribe(()=>{
      this.encuesta.update((encuesta) => {
        return {
          ...encuesta,
          respuesta_votada: this.opcionSeleccionada()!,
        };
      })
      
      this.opcionSeleccionada.set(undefined);
    });
  }
}

