import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { Hilo } from '../../interfaces/hilo.interface';
import { HiloBodyComponent } from "../../components/hilo-body/hilo-body.component";
import { ComentariosListComponent } from "../../../comentarios/components/comentarios-list/comentarios-list.component";
import { ComentarHiloComponent } from "../../components/comentar-hilo/comentar-hilo.component";
import { HiloComentariosComponent } from "../../components/hilo-comentarios/hilo-comentarios.component";
import { Comentario } from '../../../comentarios/interface/comentario.interface';
import { HttpClient } from '@angular/common/http';
import { HiloPageService } from '../../services/hilo-page.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../../application/components/header/header.component";
import { ComentarioComponent } from "../../../comentarios/components/comentarios-list/comentario/comentario.component";

@Component({
  selector: 'hilo-page',
  imports: [HiloBodyComponent, ComentarHiloComponent, HiloComentariosComponent, CommonModule, HeaderComponent, ComentarioComponent],
  templateUrl: './hilo-page.component.html',
  styleUrl: './hilo-page.component.css',
})
export class HiloPageComponent implements OnInit {


  service = inject(HiloPageService);

  get hilo (){
    return this.service.hilo()
  }

  get comentarios (){
    return this.service.comentarios()
  }

  get cargandoHilo (){
    return this.service.cargandoHilo()
  }

  get cargandoComentarios (){
    return this.service.cargandoComentarios()
  }

  route = inject(ActivatedRoute);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service.cargarHilo(id).subscribe(() => {
        this.route.queryParams.subscribe(params => {
          setTimeout(() => {
            const comentario: string | undefined = params['comentario'];
            if (comentario) {
              this.scrollToComentario(comentario);
            }
          }, 500);
        });

      });
    }
  }

  scrollToComentario(id: string) {
    var e = document.getElementById(id)

    if (e) {
      e.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
