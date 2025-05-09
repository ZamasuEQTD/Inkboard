import { Component, input, model } from '@angular/core';
import { FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-encuesta',
  imports: [ReactiveFormsModule],
  templateUrl: './crear-encuesta.component.html',
  styleUrl: './crear-encuesta.component.css',
})
export class CrearEncuestaComponent {
  encuesta = input.required<FormArray<FormControl<string | null>>>()

  agregarOpcion() :void {
    this.encuesta().push(new FormControl<string>(""));
  }

  eliminarOpcion(index: number) :void {
    this.encuesta().removeAt(index);
  }
}
