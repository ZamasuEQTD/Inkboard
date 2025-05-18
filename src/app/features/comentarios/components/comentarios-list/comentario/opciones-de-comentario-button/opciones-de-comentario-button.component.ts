import { Component, ElementRef, inject, input, signal, ViewChild } from '@angular/core';
import { MenuComponent } from "../../../../../../shared/components/menu/menu.component";
import { Comentario } from '../../../../interface/comentario.interface';
import { HiloPageService } from '../../../../../hilos/services/hilo-page.service';
import { AuthService } from '../../../../../auth/services/auth.service';
import { MenuGroup } from '../../../../../../shared/interfaces/menu.interface';
import { Dialog } from '@angular/cdk/dialog';
import { VerRegistrosDeUsuarioDialogComponent } from '../../../../../moderacion/components/ver-registros-de-usuario-dialog/ver-registros-de-usuario-dialog.component';

@Component({
  selector: 'app-opciones-de-comentario-button',
  imports: [MenuComponent],
  templateUrl: './opciones-de-comentario-button.component.html',
  styleUrl: './opciones-de-comentario-button.component.css',
})
export class OpcionesDeComentarioButtonComponent {
  comentario = input.required<Comentario>();
  mostrarOpciones = signal<boolean>(false);

  @ViewChild("opcionesRef") comentarioRef!: ElementRef<HTMLDivElement>;

  hiloService = inject(HiloPageService);

  authService = inject(AuthService);

  dialog = inject(Dialog)

  ngOnInit() {
    document.addEventListener('click', this.handleClickOutside.bind(this));
  }

  private handleClickOutside(event: MouseEvent) {
    if (this.comentarioRef && !this.comentarioRef.nativeElement.contains(event.target as Node)) {
      this.toggleOpciones();
    }
  }

  toggleOpciones() {
    this.mostrarOpciones.set(!this.mostrarOpciones());
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

                    this.mostrarOpciones.set(false)
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
              items: [{ label: 'Destacar', icon: 'fas fa-hashtag' }],
              separator: true
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
                  label: 'Ver usuario', 
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
                { label: 'Eliminar', icon: 'fa-solid fa-trash' }
              ],
              separator: true
            }
          ]
        : [])
    ];
  }
}
