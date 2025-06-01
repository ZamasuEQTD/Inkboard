import { Component, input } from '@angular/core';
import { Hilo } from '../../interfaces/hilo.interface';
import { ComentariosListComponent } from "../../../comentarios/components/comentarios-list/comentarios-list.component";
import { Comentario } from '../../../comentarios/interface/comentario.interface';
import { ComentarHiloComponent } from "../comentar-hilo/comentar-hilo.component";
import { CdkScrollable } from '@angular/cdk/scrolling';

@Component({
  selector: 'hilo-comentarios',
  imports: [ComentariosListComponent, ComentarHiloComponent, CdkScrollable],
  templateUrl: './hilo-comentarios.component.html',
  styleUrl: './hilo-comentarios.component.css',
})
export class HiloComentariosComponent {
  hilo = input.required<Hilo | null>();

  cargandoComentarios = input.required<boolean>();

  cargandoHilo = input<boolean>(true);

  comentarios = input.required<Comentario[]>();
}
