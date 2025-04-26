import { Component, input } from '@angular/core';
import { Portada } from '../../interfaces/portada.interface';
import { PortadaComponent } from "./portada/portada.component";
import { PortadaSkeletonComponent } from "./portada-skeleton/portada-skeleton.component";

@Component({
  selector: 'hilos-portadas-grid',
  imports: [PortadaComponent, PortadaSkeletonComponent],
  templateUrl: './portadas.component.html',
  styleUrl: './portadas.component.css',
})
export class PortadasComponent {
  portadas = input.required<Portada[]>();

  cargando = input.required<boolean>();
}
 