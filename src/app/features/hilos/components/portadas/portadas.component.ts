import { Component, input, output } from '@angular/core';
import { Portada } from '../../interfaces/portada.interface';
import { PortadaComponent } from "./portada/portada.component";
import { PortadaSkeletonComponent } from "./portada-skeleton/portada-skeleton.component";
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

@Component({
  selector: 'hilos-portadas-grid',
  imports: [PortadaComponent, PortadaSkeletonComponent, InfiniteScrollDirective],
  templateUrl: './portadas.component.html',
  styleUrl: './portadas.component.css',
})
export class PortadasComponent {
  portadas = input.required<Portada[]>();

  cargando = input.required<boolean>();

  onScroll = output<void>();
}
 