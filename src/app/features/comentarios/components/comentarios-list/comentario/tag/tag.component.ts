import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-comentario-tag',
  imports: [],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.css',
})
export class TagComponent {
  tag = input.required<string>()

  onTap = output();
  onMouseEnter = output();
  onMouseExit = output();
}
