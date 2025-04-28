import { Component, ElementRef, inject, input, signal, ViewChild } from '@angular/core';
import { MenuComponent, MenuGroup } from "../../../../../../shared/components/menu/menu.component";
import { Comentario } from '../../../../interface/comentario.interface';
import { HiloPageService } from '../../../../../hilos/services/hilo-page.service';
import { AuthService } from '../../../../../auth/services/auth.service';

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
              ? [{ label: 'Ver respuestas', icon: 'fas fa-hashtag' }]
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
                { label: 'Ver usuario', icon: 'fas fa-user' },
                { label: 'Eliminar', icon: 'fa-solid fa-trash' }
              ],
              separator: true
            }
          ]
        : [])
    ];
  }
}
