import { Component, effect, input, model, output, signal } from '@angular/core';

@Component({
  selector: 'app-blur-advertencia',
  imports: [],
  templateUrl: './blur-advertencia.component.html',
  styleUrl: './blur-advertencia.component.css',
})
export class BlurAdvertenciaComponent {

  readonly spoiler = model.required<boolean>();


  readonly onToggleSpoiler = output<boolean>();

  toggleSpoiler() {
    this.spoiler.set(!this.spoiler());
    
    this.onToggleSpoiler.emit(this.spoiler());
  }
}
