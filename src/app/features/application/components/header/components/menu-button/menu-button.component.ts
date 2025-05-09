import { Component, effect, inject, signal } from '@angular/core';
import { AuthService } from '../../../../../auth/services/auth.service';
import { MenuGroup } from '../../../../../../shared/interfaces/menu.interface';
import { MenuGroupComponent } from "../../../../../../shared/components/menu-group/menu-group.component";
import { DialogComponent } from "../../../../../../shared/components/dialog/dialog.component";
import { LoginDialogComponent } from "../../../../../auth/components/login-dialog/login-dialog.component";
import { RegistroDialogComponent } from "../../../../../auth/components/registro-dialog/registro-dialog.component";

@Component({
  selector: 'header-menu-button',
  imports: [MenuGroupComponent, LoginDialogComponent, RegistroDialogComponent],
  templateUrl: './menu-button.component.html',
  styleUrl: './menu-button.component.css',
})
export class MenuButtonComponent { 

  mostrarMenu = signal(false);

  auth = inject(AuthService);

  mostrarLogin = signal<boolean>(false);

  mostrarRegistro = signal<boolean>(false);

  items: MenuGroup[] = [
    {
      separator: true,
      label: "Mis colecciones",
      items: [
        {
          label: "Seguidos",

          icon: "fa-solid fa-users",
        },
        {
          label: "Favoritos",
          icon: "fa-solid fa-heart",
        },
        { label: "Ocultos", icon: "fa-solid fa-eye-slash" },
      ],
    },
    {
      items: [
        {
          label: "Cerrar sesión",
          icon: "fa-solid fa-right-from-bracket",
          onTap: () => {
            this.auth.logout();
          },
        },
      ],
    },
  ];

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

   get username () : string {
    const user = this.auth.currentUser();

    if (!user) {
      throw new Error("No se ha podido obtener el nombre de usuario");
    }

    return user.username;
  }

  get autenticado (): boolean { 
    return this.auth.autenticado();
  }
}
