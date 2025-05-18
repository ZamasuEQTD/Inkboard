import { Component, inject, model, signal } from '@angular/core';
import { PostearHiloDialogComponent } from "../../../hilos/components/postear-hilo-dialog/postear-hilo-dialog.component";
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'home-postear-hilo-button',
  templateUrl: './postear-hilo-button.component.html',
  styleUrl: './postear-hilo-button.component.css',
})
export class PostearHiloButtonComponent {
 
  dialog = inject(Dialog)
  
  mostrar():void{
    this.dialog.open(PostearHiloDialogComponent)
  }
}
