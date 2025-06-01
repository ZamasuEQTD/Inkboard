import { Component, ElementRef, inject, input, signal, ViewChild } from '@angular/core';
import { MenuComponent } from "../../../../../../shared/components/menu/menu.component";
import { Comentario } from '../../../../interface/comentario.interface';
import { HiloPageService } from '../../../../../hilos/services/hilo-page.service';
import { AuthService } from '../../../../../auth/services/auth.service';
import { MenuGroup } from '../../../../../../shared/interfaces/menu.interface';
import { Dialog } from '@angular/cdk/dialog';
import { VerRegistrosDeUsuarioDialogComponent } from '../../../../../moderacion/components/ver-registros-de-usuario-dialog/ver-registros-de-usuario-dialog.component';
import { ComentariosService } from '../../../../services/comentarios.service';
import { CustomOverlayComponent } from "../../../../../../shared/components/custom-overlay/custom-overlay.component";
import { Overlay, OverlayRef } from '@angular/cdk/overlay';

@Component({
  selector: 'app-opciones-de-comentario-button',
  imports: [MenuComponent, CustomOverlayComponent],
  templateUrl: './opciones-de-comentario-button.component.html',
  styleUrl: './opciones-de-comentario-button.component.css',
})
export class OpcionesDeComentarioButtonComponent {
  comentario = input.required<Comentario>();

  @ViewChild("button") button!: ElementRef<HTMLDivElement>;

  hiloService = inject(HiloPageService);

  authService = inject(AuthService);

  dialog = inject(Dialog)

  comentariosService = inject(ComentariosService)

  overlay = inject(Overlay);

  overlayRef? : OverlayRef

  @ViewChild("opciones") menu!: CustomOverlayComponent;

  mostraMenu(){
  this.overlayRef = this.overlay.create({
      backdropClass: "bg-transparent",
      scrollStrategy: this.overlay.scrollStrategies.close(),
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

  get opciones(): MenuGroup[] {
    return [
      {
        items: [
          { label: 'Denunciar', icon: 'fa-solid fa-flag' },
          { label: 'Ocultar', icon: 'fa-solid fa-eye' },
          ...(
            this.comentario().respondido_por.length !== 0
              ? [{ 
                  label: 'Ver respuestas', 
                  icon: 'fas fa-hashtag',
                  onTap: () => {
                    this.hiloService.setHistorialFromTags(this.comentario().respondido_por);

                    
                  }
                }]
              : []
          )
        ],
        separator: true
      },
      ...(this.hiloService.hilo()!.es_op
        ? [
            {
              items: [{ label: 'Destacar', icon: 'fas fa-hashtag',onTap: () => {
                this.comentariosService.destacar(this.hiloService.hilo()!.id, this.comentario().id).subscribe();
              } }],
              separator: true,
              
            }
          ]
        : []),
      ...(this.comentario().es_autor
        ? [
            {
              items: [
                { label: 'Desactivar notificaciones', icon: 'fa-solid fa-bell' }
              ],
              separator: true
            }
          ]
        : []),
      ...(this.authService.isModerador
        ? [
            {
              items: [
                { 
                  label: 'Ver actividad', 
                  icon: 'fas fa-user' , 
                  onTap: () => {
                    this.dialog.open(VerRegistrosDeUsuarioDialogComponent, 
                    {
                      data :{
                        id:this.comentario().autor_id!
                      }
                    })
                  }
                },
                { label: 'Eliminar', icon: 'fa-solid fa-trash' , onTap : ()=> {
                  this.comentariosService.eliminar(this.hiloService.hilo()!.id, this.comentario().id).subscribe();
                }}
              ],
              separator: true
            }
          ]
        : [])
    ];
  }
}
