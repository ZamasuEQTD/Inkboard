import { Component, ElementRef, HostListener, inject, InjectionToken, OnDestroy, OnInit, output, signal, ViewChild } from '@angular/core';
import { DialogHeaderComponent } from "../../../../shared/components/dialog/components/dialog-header/dialog-header.component";
import { Notificacion } from '../../interfaces/notificacion.interface';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../../application/interfaces/api-response.interface';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NotificacionComponent } from "../notificacion/notificacion.component";
import { NotificacionesService } from '../../service/notificaciones.service';
import { Router } from '@angular/router';
import { OverlayRef } from '@angular/cdk/overlay';
import { MisNotificacionesService } from '../../service/mis-notificaciones.service';

export const NOTIFICACIONES_DATA = new InjectionToken<any>('NotificacionesData');

@Component({
  selector: 'app-notificaciones-overlay',
  imports: [DialogHeaderComponent, CommonModule, NotificacionComponent],
  templateUrl: './notificaciones-overlay.component.html',
  styleUrl: './notificaciones-overlay.component.css',
})
export class NotificacionesOverlayComponent  implements OnInit, OnDestroy{
  ngOnDestroy(): void {
    document.removeEventListener('click', this.onClickOutside.bind(this))
  }
  @ViewChild("ref") ref! :ElementRef<HTMLElement>;
 
  data =  inject(NOTIFICACIONES_DATA)
  
  overlay = inject(OverlayRef);

  ngOnInit(): void {
    document.addEventListener('click',this.onClickOutside.bind(this));
  } 

  onClickOutside(event: MouseEvent){
    if (this.ref && !this.ref.nativeElement.contains(event.target as Node)) {
      console.log("hola");
      
      this.close();  
    }
  }

  close(){
    this.overlay.dispose();
  }

  private readonly service = inject(MisNotificacionesService);

  private readonly router = inject(Router)


  get notificaciones() {
    return this.service.notificaciones();
  }

  leer(notificacion: Notificacion){
    this.service.leer(notificacion.id).subscribe(()=> {
      this.router.navigate(["/hilo/",notificacion.hilo.id], {
        queryParams:{
          comentario: notificacion.comentario_respuesta_tag
        }
      })
    })
  }
}
