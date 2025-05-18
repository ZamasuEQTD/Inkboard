import { Component, inject, model, output } from '@angular/core';
import { DialogComponent } from "../../../../shared/components/dialog/dialog.component";
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

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
  
    data = inject<SeleccionarDuracionDialogData>(DIALOG_DATA);

    dialogRef = inject(DialogRef)

    get durations(): string []{
      return SeleccionarDuracionDeBaneoComponent.DURATIONS;
    }
}
interface SeleccionarDuracionDialogData {
  onDuracionSeleccionada : (idx : number)=> {}
}