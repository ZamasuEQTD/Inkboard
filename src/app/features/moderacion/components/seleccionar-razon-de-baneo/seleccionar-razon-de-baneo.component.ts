import { Component, model, output } from '@angular/core';
import { DialogComponent } from "../../../../shared/components/dialog/dialog.component";

@Component({
  selector: 'app-seleccionar-razon-de-baneo',
  imports: [DialogComponent],
  templateUrl: './seleccionar-razon-de-baneo.component.html',
  styleUrl: './seleccionar-razon-de-baneo.component.css',
})
export class SeleccionarRazonDeBaneoComponent {
  static readonly RAZONES: string[] = [
      "Spam",
      "Contenido inapropiado",
      "Categoria incorrecta",
      "Otro"
  ];

  visible = model.required<boolean>()

  onRazonSeleccionada = output<number>();

  get razones () : string [] {
    return SeleccionarRazonDeBaneoComponent.RAZONES;
  }
}
