import { Component, model, signal } from '@angular/core';
import { PostearHiloDialogComponent } from "../../../hilos/components/postear-hilo-dialog/postear-hilo-dialog.component";

@Component({
  selector: 'home-postear-hilo-button',
  imports: [PostearHiloDialogComponent],
  templateUrl: './postear-hilo-button.component.html',
  styleUrl: './postear-hilo-button.component.css',
})
export class PostearHiloButtonComponent {
  visible = signal<boolean>(false);
}
