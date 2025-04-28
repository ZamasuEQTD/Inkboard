import { Component, inject, OnInit, signal } from '@angular/core';
import { Hilo } from '../../interfaces/hilo.interface';
import { HiloBodyComponent } from "../../components/hilo-body/hilo-body.component";
import { ComentariosListComponent } from "../../../comentarios/components/comentarios-list/comentarios-list.component";
import { ComentarHiloComponent } from "../../components/comentar-hilo/comentar-hilo.component";
import { HiloComentariosComponent } from "../../components/hilo-comentarios/hilo-comentarios.component";
import { Comentario } from '../../../comentarios/interface/comentario.interface';
import { HttpClient } from '@angular/common/http';
import { HiloPageService } from '../../services/hilo-page.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'hilo-page',
  imports: [HiloBodyComponent, ComentarHiloComponent, HiloComentariosComponent],
  templateUrl: './hilo-page.component.html',
  styleUrl: './hilo-page.component.css',
})
export class HiloPageComponent implements OnInit {


  private service = inject(HiloPageService);

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
      this.service.cargarHilo(id).subscribe();
    }
  }
}
