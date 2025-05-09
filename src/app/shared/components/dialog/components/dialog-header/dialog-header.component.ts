import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-dialog-header',
  imports: [],
  templateUrl: './dialog-header.component.html',
  styleUrl: './dialog-header.component.css',
})
export class DialogHeaderComponent {
  title = input.required<string>()

  onClose = output<void>();
}
