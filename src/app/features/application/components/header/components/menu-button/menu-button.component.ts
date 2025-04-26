import { Component, effect, signal } from '@angular/core';

@Component({
  selector: 'header-menu-button',
  imports: [],
  templateUrl: './menu-button.component.html',
  styleUrl: './menu-button.component.css',
})
export class MenuButtonComponent { 

  mostrarMenu = signal(false);


  esconderScroll = effect(() => {
    if (this.mostrarMenu()) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  });

  toggleMenu() : void {
    this.mostrarMenu.update((mostrar )=> !mostrar);
  }
}
