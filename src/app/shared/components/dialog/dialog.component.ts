import { Component, input, model } from '@angular/core';
import { DialogHeaderComponent } from "./components/dialog-header/dialog-header.component";

@Component({
  selector: 'app-dialog',
  imports: [DialogHeaderComponent],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent {
  title = input<string>();

  visible = model.required<boolean>();


  toggleVisible() : void {
    this.visible.update((visible) => !visible);
  }

}

