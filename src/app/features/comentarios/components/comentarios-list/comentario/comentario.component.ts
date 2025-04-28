import { Component, input } from '@angular/core';
import { Comentario } from '../../../interface/comentario.interface';
import { CommonModule } from '@angular/common';
import { ColorComponent } from "./color/color.component";
import { AutorRolePipe } from "../../../../application/pipes/autor_role.pipe";
import { ColorPicker } from '../../../../../shared/util/color-picker-util';
import { TiempoTranscurridoPipe } from "../../../../application/pipes/tiempoTranscurrido.pipe";
import { MediaBoxComponent } from "../../../../application/components/media-box/media-box.component";
import { BlurAdvertenciaComponent } from "../../../../../shared/components/blur-advertencia/blur-advertencia.component";
import { OpcionesDeComentarioButtonComponent } from "./opciones-de-comentario-button/opciones-de-comentario-button.component";

@Component({
  selector: 'app-comentario',
  imports: [CommonModule, ColorComponent, AutorRolePipe, TiempoTranscurridoPipe, MediaBoxComponent, BlurAdvertenciaComponent, OpcionesDeComentarioButtonComponent],
  templateUrl: './comentario.component.html',
  styleUrl: './comentario.component.css',
})
export class ComentarioComponent {
  comentario = input.required<Comentario>();


  get colorTagUnico(): string {
    return ColorPicker.generar(this.comentario().tag_unico!);
  }
}

