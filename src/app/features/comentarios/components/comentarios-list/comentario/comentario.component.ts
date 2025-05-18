import { Component, computed, ElementRef, inject, input, model, signal, ViewChild, viewChild } from '@angular/core';
import { Comentario } from '../../../interface/comentario.interface';
import { CommonModule } from '@angular/common';
import { ColorComponent } from "./color/color.component";
import { AutorRolePipe } from "../../../../application/pipes/autor_role.pipe";
import { ColorPicker } from '../../../../../shared/util/color-picker-util';
import { TiempoTranscurridoPipe } from "../../../../application/pipes/tiempoTranscurrido.pipe";
import { MediaBoxComponent } from "../../../../application/components/media-box/media-box.component";
import { BlurAdvertenciaComponent } from "../../../../../shared/components/blur-advertencia/blur-advertencia.component";
import { OpcionesDeComentarioButtonComponent } from "./opciones-de-comentario-button/opciones-de-comentario-button.component";
import { HiloPageService } from '../../../../hilos/services/hilo-page.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comentario',
  imports: [CommonModule, ColorComponent, AutorRolePipe, TiempoTranscurridoPipe, MediaBoxComponent, BlurAdvertenciaComponent, OpcionesDeComentarioButtonComponent],
  templateUrl: './comentario.component.html',
  styleUrl: './comentario.component.css',
})


export class ComentarioComponent {
  route = inject(Router)
  service = inject(HiloPageService)
    
  comentario = input.required<Comentario>();

  @ViewChild("comentarioRef") comentarioRef!: ElementRef<HTMLElement>

  comentarioSeleccionado = signal<Comentario | undefined>(undefined);

  hayComentarioSeleccionado = computed(()=> !!this.comentarioSeleccionado());

  scroll = input<HTMLElement | undefined>()

  hoverPosition = { top: 0, left: 0 };


  get colorTagUnico(): string {
    return ColorPicker.generar(this.comentario().tag_unico!);
  }


  mostrarRespuesta(tag:string) : void {
    if(window.innerWidth < 640) return;

    var comentario = this.service.comentariosByTagMap.get(tag);

    if(!comentario) return;

    this.comentarioSeleccionado.set(comentario);

    const boxRect = this.comentarioRef.nativeElement.getBoundingClientRect();
    
    const containerRect = this.scroll()!.getBoundingClientRect();
  
    const top = boxRect.top;

    this.hoverPosition = {
      top:top,
      left: containerRect.left - 150,
    };

  }

  ocultarRespuesta() : void {
    this.comentarioSeleccionado.set(undefined);
  }

  async irComentario(tag:string) : Promise<void> {
    const c: Comentario | undefined = this.service.comentariosByTagMap.get(tag);

    if (!c) return;
  
    if (window.innerWidth < 640 || this.service.hayHistorialDeComentarios) {
      this.service.historialDeComentariosSeleccionado.set([c])
      
      return;
    }

    await this.route.navigate(["/hilo", this.service.hilo()?.id])

    await this.route.navigate([
      "/hilo", this.service.hilo()?.id], {
      replaceUrl: true,
      queryParams: {
        comentario: tag
      }
    })
  }
}

