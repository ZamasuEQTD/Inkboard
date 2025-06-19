import { CommonModule } from '@angular/common';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {Dialog} from '@angular/cdk/dialog';
import { SeleccionarSubcategoriaDialogComponent } from '../../../categorias/components/seleccionar-subcategoria-dialog/seleccionar-subcategoria-dialog.component';
import { Subcategoria } from '../../../categorias/interfaces/categoria.interface';

@Component({
  selector: 'app-filtros-de-hilo',
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './filtros-de-hilo.component.html',
  styleUrl: './filtros-de-hilo.component.css',
})
export class FiltrosDeHiloComponent  implements OnInit{
  fb = inject(FormBuilder);

  form = this.fb.group({
    titulo : this.fb.control<string>(""),
    subcategoria : this.fb.control<Subcategoria | undefined>(undefined),
  })

  activatedRoute = inject(ActivatedRoute);

  dialog = inject(Dialog)

  ngOnInit(): void {
    let titulo  =  this.activatedRoute.snapshot.queryParams["titulo"]?? ""

    this.form.patchValue({
      titulo: titulo
    });
  }

  mostrarSubcategorias ():void {
    SeleccionarSubcategoriaDialogComponent.show(this.dialog, {
      onSubcategoriaSeleccionada: (subcategoria) =>{
        this.form.patchValue({
          subcategoria: subcategoria
        })
      }
    });
  }

  router = inject(Router);

  buscarHilos(){
    let titulo = this.form.value.titulo != "" ? this.form.value.titulo : undefined;

    let subcategoria = this.form.value.subcategoria?.id

    this.router.navigate(
      [""],
      {
        queryParams: 
          { 
            titulo,
            subcategoria
          } 
      }
    )
  }
}
