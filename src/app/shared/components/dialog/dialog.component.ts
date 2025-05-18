import { Component, effect, input, model, OnDestroy, output, ViewChild } from '@angular/core';
import { DialogHeaderComponent } from "./components/dialog-header/dialog-header.component";

@Component({
  selector: 'app-dialog',
  imports: [DialogHeaderComponent],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent {
  title = input<string>();

  fullScreenOnMobile = input<boolean>(true)

  onClose  = output<void>()

  close(){
    this.onClose.emit();
  }
}

