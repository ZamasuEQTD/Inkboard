import { Component, ElementRef, input, ViewChild } from '@angular/core';
import { Comentario } from '../../interface/comentario.interface';
import { ComentarioComponent } from "./comentario/comentario.component";
import { CdkScrollable } from '@angular/cdk/scrolling';

@Component({
  selector: 'comentarios-list',
  imports: [ComentarioComponent, CdkScrollable],
  templateUrl: './comentarios-list.component.html',
  styleUrl: './comentarios-list.component.css',
})
export class ComentariosListComponent {
  comentarios =input.required<Comentario[]>()
  
  cargandoComentarios = input.required<boolean>();

  @ViewChild("scroll") scroll!:ElementRef<HTMLElement> 

}
