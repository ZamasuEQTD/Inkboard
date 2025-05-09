import { Component, input } from '@angular/core';
import { Subcategoria } from '../../interfaces/categoria.interface';

@Component({
  selector: 'app-subcategoria',
  imports: [],
  templateUrl: './subcategoria.component.html',
  styleUrl: './subcategoria.component.css',
})
export class SubcategoriaComponent {
  subcategoria = input.required<Subcategoria>()
}
