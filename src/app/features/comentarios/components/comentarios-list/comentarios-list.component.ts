import { Component, input, signal } from '@angular/core';
import { Comentario } from '../../interface/comentario.interface';
import { ComentarioComponent } from "./comentario/comentario.component";

@Component({
  selector: 'comentarios-list',
  imports: [ComentarioComponent],
  templateUrl: './comentarios-list.component.html',
  styleUrl: './comentarios-list.component.css',
})
export class ComentariosListComponent {
  comentarios =input.required<Comentario[]>()
  
  cargandoComentarios = input.required<boolean>();
}
