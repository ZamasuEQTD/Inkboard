import { Component, input } from '@angular/core';
import { Hilo } from '../../interfaces/hilo.interface';
import { BlurAdvertenciaComponent } from "../../../../shared/components/blur-advertencia/blur-advertencia.component";
import { MediaBoxComponent } from "../../../application/components/media-box/media-box.component";
import { CommonModule } from '@angular/common';
import { AutorRolePipe } from "../../../application/pipes/autor_role.pipe";
import { TiempoTranscurridoPipe } from "../../../application/pipes/tiempoTranscurrido.pipe";
import { RouterModule } from '@angular/router';
import { EncuestaComponent } from "../../../encuesta/components/encuesta/encuesta.component";

@Component({
  selector: 'hilo-body',
  imports: [BlurAdvertenciaComponent, MediaBoxComponent, CommonModule, AutorRolePipe, TiempoTranscurridoPipe, RouterModule, EncuestaComponent],
  templateUrl: './hilo-body.component.html',
  styleUrl: './hilo-body.component.css',
})
export class HiloBodyComponent { 
  hilo = input.required<Hilo | null>()

  cargando = input<boolean>(true);
}
