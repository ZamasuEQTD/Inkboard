import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'comentario-color',
  imports: [CommonModule],
  templateUrl: './color.component.html',
  styleUrl: './color.component.css',
})
export class ColorComponent {
  color = input.required<string>();
}
