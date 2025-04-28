import { computed, inject, Injectable, signal } from '@angular/core';
import { Hilo } from '../interfaces/hilo.interface';
import { Comentario, ComentariosHilo } from '../../comentarios/interface/comentario.interface';
import { map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../application/interfaces/api-response.interface';
import { FormBuilder,  } from '@angular/forms';
import { PickedMedia } from '../../../shared/interfaces/picked-media.interface';

@Injectable({
  providedIn: 'root'
})
export class HiloPageService {
  readonly hilo = signal<Hilo | null>(null);
  readonly cargandoHilo = signal<boolean>(false);

  readonly cargandoComentarios = signal<boolean>(false);
  private readonly comentariosNormales = signal<Comentario[]>([]);
  private readonly comentariosDestacados = signal<Comentario[]>([]);
  
  readonly comentariosMap : Map<string, Comentario> =  new Map<string, Comentario>();

  readonly comentarios = computed(() => {
    return [...this.comentariosDestacados(), ...this.comentariosNormales()];
  });

  readonly historialDeComentariosSeleccionado = signal<Comentario[]>([]);

  http = inject(HttpClient);

  private fb: FormBuilder = inject(FormBuilder);

  comentarHiloForm = this.fb.group({
    texto: '',
    files: this.fb.control<PickedMedia[]>([], {
      validators: [],
     }),
  });

  constructor() { }

  cargarHilo(id:string) : Observable<Hilo>{    
    this.cargandoHilo.set(true);

    return this.http
      .get<ApiResponse<Hilo>>(`/api/hilos/${id}`)
      .pipe(
        map((response) => response.data),
        tap((hilo) => {
          this.hilo.set(hilo);
          this.cargandoHilo.set(false);
        
          this.cargarComentarios(id).subscribe();
        })
      );
  }

  private cargarComentarios(id: string): Observable<ComentariosHilo> {
    this.cargandoComentarios.set(true);

    return this.http
      .get<ApiResponse<ComentariosHilo>>(`/api/comentarios/hilo/${id}`)
      .pipe(
        map((response) => response.data),
        tap((comentarios) => {
          this.comentariosNormales.set(comentarios.destacados);
          this.comentariosDestacados.set(comentarios.comentarios);
          this.cargandoComentarios.set(false);
        })
      );
  }
}
