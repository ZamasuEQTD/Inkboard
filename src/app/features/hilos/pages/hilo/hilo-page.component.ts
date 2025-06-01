import { Component, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { HiloBodyComponent } from "../../components/hilo-body/hilo-body.component";
import { ComentarHiloComponent } from "../../components/comentar-hilo/comentar-hilo.component";
import { HiloComentariosComponent } from "../../components/hilo-comentarios/hilo-comentarios.component";
import { HiloPageService } from '../../services/hilo-page.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../../application/components/header/header.component";
import { ComentarioComponent } from "../../../comentarios/components/comentarios-list/comentario/comentario.component";
import { VerRegistrosDeUsuarioDialogComponent } from "../../../moderacion/components/ver-registros-de-usuario-dialog/ver-registros-de-usuario-dialog.component";
import { DialogComponent } from "../../../../shared/components/dialog/dialog.component";
import { HiloSignalrService } from '../../services/hilo-signalr.service';
import { CdkScrollable } from '@angular/cdk/scrolling';

@Component({
  selector: 'hilo-page',
  imports: [HiloBodyComponent, CdkScrollable, ComentarHiloComponent, HiloComentariosComponent, CommonModule, HeaderComponent, ComentarioComponent, VerRegistrosDeUsuarioDialogComponent, DialogComponent],
  templateUrl: './hilo-page.component.html',
  styleUrl: './hilo-page.component.css',
})
export class HiloPageComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.signalR.stop();

    this.service.reiniciar();
  }

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

  signalR = inject(HiloSignalrService)

  onHiloComentado = effect(()=>{
    if(this.signalR.onHiloComentado()) {
      this.service.agregarComentario(this.signalR.onHiloComentado()!);
    }
  })

  onHiloEliminado = effect(()=>{
    if(this.signalR.onComentarioEliminado()) {
      this.service.eliminarComentario(this.signalR.onComentarioEliminado()!);
    }
  })

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service.cargarHilo(id).subscribe(() => {

        this.signalR.start(id);

        this.route.queryParams.subscribe(params => {
          setTimeout(() => {
            const comentario: string | undefined = params['comentario'];
            if (comentario) {
              if(window.innerWidth <= 640){
                this.service.setHistorialFromTags([comentario])
              }
              else {
                this.scrollToComentario(comentario);
              }
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
