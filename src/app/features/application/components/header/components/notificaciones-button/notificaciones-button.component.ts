import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal, ComponentPortal, PortalModule } from '@angular/cdk/portal';
import { Component, ElementRef, inject, Injector, ViewChild } from '@angular/core';
import { DialogHeaderComponent } from "../../../../../../shared/components/dialog/components/dialog-header/dialog-header.component";
import { NOTIFICACIONES_DATA, NotificacionesOverlayComponent } from "../../../../../notificaciones/components/notificaciones-overlay/notificaciones-overlay.component";

@Component({
  selector: 'app-notificaciones-button',
  imports: [PortalModule, NotificacionesOverlayComponent],
  templateUrl: './notificaciones-button.component.html',
  styleUrl: './notificaciones-button.component.css',
})
export class NotificacionesButtonComponent { 
  overlay = inject(Overlay)

  @ViewChild("button") button!: ElementRef<HTMLElement>;

  @ViewChild(CdkPortal) portal!:CdkPortal;

  ref:OverlayRef | null = null;

  private readonly injector = inject(Injector);

  mostrar(){
    this.ref =this.overlay.create({
      disposeOnNavigation:true,
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
    {provide: OverlayRef, useValue: this.ref!},
    {
    provide: NOTIFICACIONES_DATA,
    useValue: { 
      onClose : () => {
        this.close()
      }
     }
  }]
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
