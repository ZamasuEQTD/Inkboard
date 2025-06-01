import { computed, inject, Injectable, signal } from '@angular/core';
import { Hilo } from '../interfaces/hilo.interface';
import { Comentario, ComentariosHilo } from '../../comentarios/interface/comentario.interface';
import { map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../application/interfaces/api-response.interface';
import { FormBuilder,  } from '@angular/forms';
import { PickedMedia } from '../../../shared/interfaces/picked-media.interface';
import { TagUtil } from '../../comentarios/util/tag-util';
import { HilosService } from './hilos.service';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HiloPageService {
  readonly hilo = signal<Hilo | null>(null);
  readonly cargandoHilo = signal<boolean>(false);

  readonly cargandoComentarios = signal<boolean>(false);
  private readonly comentariosNormales = signal<Comentario[]>([]);
  private readonly comentariosDestacados = signal<Comentario[]>([]);
  
  readonly comentariosByTagMap : Map<string, Comentario> =  new Map<string, Comentario>();

  readonly comentarios = computed(() => {
    return [...this.comentariosDestacados(), ...this.comentariosNormales()];
  });

  readonly historialDeComentariosSeleccionado = signal<Comentario[]>([]);

  readonly usuarioSeleccionado = signal<string |  undefined>(undefined);

  http = inject(HttpClient);

  private fb: FormBuilder = inject(FormBuilder);

  private readonly service = inject(HilosService);

  private readonly route = inject(ActivatedRoute);


  comentarHiloForm = this.fb.group({
    texto: '',
    files: this.fb.control<PickedMedia[]>([], {
      validators: [],
     }),
  });

  constructor() { }

  get hayHistorialDeComentarios() : boolean {
    return this.historialDeComentariosSeleccionado().length !== 0;
  }

  tagguearComentario (tag :string ) : void {

    const texto = this.comentarHiloForm.value.texto!;

    if(TagUtil.cantidadTags(texto) >= 5 || TagUtil.incluyeTag(texto,tag)) return;

    this.comentarHiloForm.controls.texto.patchValue(texto + ">>"+ tag + " ") 
  }

  cargarHilo(id:string){    
    this.cargandoHilo.set(true);

    return this.service.getHilo(id).pipe(
      tap((hilo) => {
        this.hilo.set(hilo);
        this.cargandoHilo.set(false);

        this.cargarComentarios(id).subscribe()
      }
    ));
  }

  scrollToComentario(id: string) {
    var e = document.getElementById(id)

    if (e) {
      e.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  private cargarComentarios(id: string): Observable<ComentariosHilo> {
    this.cargandoComentarios.set(true);

    return this.http
      .get<ApiResponse<ComentariosHilo>>(`/api/comentarios/hilo/${id}`)
      .pipe(
        map((response) => response.data),
        tap((comentarios)=> {
          comentarios.comentarios.forEach(comentario => {
            this.comentariosByTagMap.set(comentario.tag, comentario);
          });
        }),
        tap((comentarios) => {
          this.comentariosNormales.set(comentarios.comentarios);
          this.comentariosDestacados.set(comentarios.destacados);
          this.cargandoComentarios.set(false);
        })
      );
  }


  setHistorialFromTags(tags : string []) : void {
    var historial : Comentario [ ] = [];

    tags.forEach((tag)=> {
      var comentario = this.comentariosByTagMap.get(tag);

      if(!comentario) return;

      historial = [...historial, comentario];
    });

    this.historialDeComentariosSeleccionado.set(historial);
  }


  agregarComentario(comentario:Comentario){
    this.comentariosByTagMap.set(comentario.tag, comentario);

    this.hilo()!.cantidad_comentarios++;

    this.comentariosNormales.update((comentarios) => [comentario,...comentarios]);

    comentario.responde_a.forEach((tag) => {
      const comentarios = this.comentarios();
      for (let i = 0; i < comentarios.length; i++) {
        const c = comentarios[i];
        
        if (c.tag === tag) {
          c.respondido_por = [...c.respondido_por, comentario.tag];
          break;
        }
      }
    })
  }

  eliminarComentario(tag:string){
    const comentario = this.comentariosByTagMap.get(tag);

    if(!comentario) return;
    
    this.comentariosByTagMap.delete(tag);

    this.hilo()!.cantidad_comentarios--;
          
    this.comentariosNormales.update((comentarios) => {
      return comentarios.filter((c) => c.tag !== tag);
    });

    this.comentariosDestacados.update((comentarios) => {
      return comentarios.filter((c) => c.id !== tag);
    });
  }


  reiniciar(){
    this.comentariosNormales.set([])
    this.comentariosDestacados.set([])
    this.comentariosByTagMap.clear();
    this.hilo.set(null);
  }
}
