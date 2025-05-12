import { Component, inject, model, output } from '@angular/core';
import { DialogComponent } from "../../../../shared/components/dialog/dialog.component";

@Component({
  selector: 'app-seleccionar-duracion-de-baneo',
  imports: [DialogComponent],
  templateUrl: './seleccionar-duracion-de-baneo.component.html',
  styleUrl: './seleccionar-duracion-de-baneo.component.css',
})
export class SeleccionarDuracionDeBaneoComponent {
    static readonly DURATIONS: string[] = [
      "Cinco minutos",
      "Una hora",
      "Un día",
      "Una semana",
      "Un mes",
      "Permanente"
    ];
  
    onDuracionSeleccionada = output<number>()

    visible = model.required<boolean>()

    get durations(): string []{
      return SeleccionarDuracionDeBaneoComponent.DURATIONS;
    }
}
