import { Component, input, signal } from '@angular/core';
import { Registro } from '../../interfaces/registro';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-registro-de-usuario',
  imports: [RouterModule],
  templateUrl: './registro-de-usuario.component.html',
  styleUrl: './registro-de-usuario.component.css',
})
export class RegistroDeUsuarioComponent {
  registro = input.required<Registro>();

  tipo = input.required<'hilos' | 'comentarios'>()
}
