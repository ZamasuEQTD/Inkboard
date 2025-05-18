import { Component, inject, model, output } from '@angular/core';
import { DialogComponent } from "../../../../shared/components/dialog/dialog.component";
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

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

  data = inject<SeleccionarRazonDialogData>(DIALOG_DATA)

  dialogRef = inject(DialogRef)

  get razones () : string [] {
    return SeleccionarRazonDeBaneoComponent.RAZONES;
  }
}
interface SeleccionarRazonDialogData {
  onRazonSeleccionada : (idx : number)=> {}
}