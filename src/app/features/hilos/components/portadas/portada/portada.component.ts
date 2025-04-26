import { Component, computed, input } from '@angular/core';
import { Portada } from '../../../interfaces/portada.interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'hilos-portada',
  imports: [RouterModule,CommonModule],
  templateUrl: './portada.component.html',
  styleUrl: './portada.component.css',
})
export class PortadaComponent { 

  portada = input.required<Portada>()
}

