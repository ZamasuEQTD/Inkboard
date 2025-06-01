import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal, ComponentPortal, PortalModule } from '@angular/cdk/portal';
import { Component, effect, ElementRef, inject, Injector, OnInit, ViewChild } from '@angular/core';
import { DialogHeaderComponent } from "../../../../shared/components/dialog/components/dialog-header/dialog-header.component";
import { NOTIFICACIONES_DATA, NotificacionesOverlayComponent } from "../notificaciones-overlay/notificaciones-overlay.component";
import { AuthService } from '../../../auth/services/auth.service';
import { MisNotificacionesService } from '../../service/mis-notificaciones.service';
import { NotificacionesSignalrService } from '../../service/notificaciones-signalr.service';

@Component({
  selector: 'app-notificaciones-button',
  imports: [PortalModule],
  templateUrl: './notificaciones-button.component.html',
  styleUrl: './notificaciones-button.component.css',
})
export class NotificacionesButtonComponent  implements OnInit{
  onNotificacionRecibida = effect(() => {
    const notificacion = this.signalR.onNotificacionRecibida();

    if(notificacion){
      this.service.notificaciones.update((notis)=> [notificacion,...notis])
    }
  })
 
  ngOnInit(): void {
    if(!this.service.inicializado()){
      this.service.cargarNotificaciones()

      this.service.inicializado.set(true);
    }

    this.signalR.start();
  } 
  overlay = inject(Overlay)

  @ViewChild("button") button!: ElementRef<HTMLElement>;

  @ViewChild(CdkPortal) portal!:CdkPortal;

  ref:OverlayRef | null = null;

  private service = inject(MisNotificacionesService)

  private  auth = inject(AuthService);

  private signalR = inject(NotificacionesSignalrService);

  private readonly injector = inject(Injector);


  onLogout = effect(()=> {
    if(this.auth.autenticado()) return
    
    this.ref?.dispose(); 

    this.ref = null;

    this.service.notificaciones.set([]);

    this.signalR.stop();
  })

  mostrar(){
    this.ref = this.overlay.create({
      disposeOnNavigation:true,
      hasBackdrop: true,
      backdropClass: "bg-transparent",
      positionStrategy: this.overlay.position().flexibleConnectedTo(this.button).withPositions([ {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
          offsetY: 10 // Espacio entre el botón y el overlay
        }])
    })

    const injector = Injector.create({
      parent: this.injector,
      providers: [
      { provide: OverlayRef, useValue: this.ref! },
      {
        provide: NOTIFICACIONES_DATA,
        useValue: {
        onClose: () => {
          this.close();
        }
        }
      }
      ]
    });

    this.ref.hostElement.classList.add(...["overlay-custom"])

    this.ref.attach(new ComponentPortal(NotificacionesOverlayComponent,null, injector));
  }

  close(){
    if(this.ref){
      this.ref.dispose();
    }
  }
}
