import { Component, input, output } from '@angular/core';
import { Categoria, Subcategoria } from '../../interfaces/categoria.interface';

@Component({
  selector: 'app-categorias-list',
  imports: [],
  templateUrl: './categorias-list.component.html',
  styleUrl: './categorias-list.component.css',
})
export class CategoriasListComponent { 
  categorias = input.required<Categoria[]>();

  cargando = input.required<boolean>()

  onSubcategoriaSeleccionada = output<Subcategoria>();
}
