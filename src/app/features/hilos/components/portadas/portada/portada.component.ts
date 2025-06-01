import { Component, computed, ElementRef, inject, input, ViewChild, viewChild } from '@angular/core';
import { Portada } from '../../../interfaces/portada.interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../auth/services/auth.service';
import { MenuGroup } from '../../../../../shared/interfaces/menu.interface';
import { Overlay, OverlayModule, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal, PortalModule } from '@angular/cdk/portal';
import { MenuComponent } from "../../../../../shared/components/menu/menu.component";
import { HttpClient } from '@angular/common/http';
import { HilosService } from '../../../services/hilos.service';
import { CustomOverlayComponent } from "../../../../../shared/components/custom-overlay/custom-overlay.component";

@Component({
  selector: 'hilos-portada',
  imports: [RouterModule, CommonModule, OverlayModule, PortalModule, MenuComponent, CustomOverlayComponent],
  templateUrl: './portada.component.html',
  styleUrl: './portada.component.css',
})
export class PortadaComponent { 

  portada = input.required<Portada>()

  auth = inject(AuthService);

  overlay = inject(Overlay)

  hilosService = inject(HilosService);

  @ViewChild("opcionesButton") button! : ElementRef<HTMLElement>;

  @ViewChild("opciones") menu! : CustomOverlayComponent;

  overlayRef?: OverlayRef

  get opciones (): MenuGroup[]{
    return [{
      separator: true,
      items: [
      {
        label: "Denunciar",
        icon: "fas fa-flag",
        onTap: () => {
        }
      },

      ...(this.auth.autenticado() && this.auth.isModerador ? [
        {
        label: "Eliminar",
        icon: "fas fa-trash",
        onTap: () => {
          this.hilosService.eliminar(this.portada().id).subscribe(() => {
          this.overlayRef?.dispose();
          })
        }
        },
        ...(this.portada().banderas.es_sticky ? [
        {
          label: "Eliminar sticky",
          icon: "fas fa-thumbtack-slash",
          onTap: () => {
            this.hilosService.eliminarSticky(this.portada().id).subscribe();
          }
        }
        ] : [{
          label: "Establecer sticky",
          icon: "fas fa-thumbtack",
          onTap:()=> {
            this.hilosService.establecerSticky(this.portada().id).subscribe();
          }
        }])
      ] : [])
      ]
    }];
  }

  showOpciones(){
     this.overlayRef = this.overlay.create({
      hasBackdrop:true,
      backdropClass: "bg-transparent",
      positionStrategy: this.overlay.position().flexibleConnectedTo(this.button).withPositions([{
        originX: 'end',
        originY: 'bottom',
        overlayX: 'end',
        overlayY: 'top',
        offsetY: 10 // Espacio entre el botón y el overlay
      }
      ])
    });
    
    this.menu.show(this.overlayRef);
  }

}

