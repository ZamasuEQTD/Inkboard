import { Component, input } from '@angular/core';
import { Hilo } from '../../interfaces/hilo.interface';
import { ComentariosListComponent } from "../../../comentarios/components/comentarios-list/comentarios-list.component";
import { Comentario } from '../../../comentarios/interface/comentario.interface';
import { ComentarHiloComponent } from "../comentar-hilo/comentar-hilo.component";

@Component({
  selector: 'hilo-comentarios',
  imports: [ComentariosListComponent, ComentarHiloComponent],
  templateUrl: './hilo-comentarios.component.html',
  styleUrl: './hilo-comentarios.component.css',
})
export class HiloComentariosComponent {
  hilo = input.required<Hilo | null>();

  cargandoComentarios = input.required<boolean>();

  comentarios = input.required<Comentario[]>();
}
