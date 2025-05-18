import { Component, inject, input, model, OnInit, output, signal } from '@angular/core';
import { DialogComponent } from "../../../../shared/components/dialog/dialog.component";
import { CategoriasListComponent } from "../categorias-list/categorias-list.component";
import { Categoria, Subcategoria } from '../../interfaces/categoria.interface';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../../application/interfaces/api-response.interface';
import { map } from 'rxjs';
import { Dialog, DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-seleccionar-subcategoria-dialog',
  imports: [DialogComponent, CategoriasListComponent],
  templateUrl: './seleccionar-subcategoria-dialog.component.html',
  styleUrl: './seleccionar-subcategoria-dialog.component.css',
})
export class SeleccionarSubcategoriaDialogComponent  implements OnInit{

  data = inject <SeleccionarSubcategoriaData>(DIALOG_DATA);

  categorias = signal<Categoria[]>([])

  dialogRef = inject<DialogRef>(DialogRef);


  private http = inject(HttpClient);

    ngOnInit(): void {
    this.cargarCategorias()
  }


  cargarCategorias ():void {
    this.http.get<ApiResponse<Categoria[]>>("/api/categorias").pipe(
      map(x=> x.data)
    ).subscribe(c=> this.categorias.set(c));
  }


  static show(
    dialog: Dialog,
    data:SeleccionarSubcategoriaData
    ) {
    
    return dialog.open(SeleccionarSubcategoriaDialogComponent, {
      data
    })
  }
}

interface SeleccionarSubcategoriaData{
  onSubcategoriaSeleccionada: (subcategoria: Subcategoria) => void
}