import { Component, inject, ViewChild } from '@angular/core';
import { MenuButtonComponent } from "./components/menu-button/menu-button.component";
import { FiltrosDeHiloComponent } from "../filtros-de-hilo/filtros-de-hilo.component";
import { RouterModule } from '@angular/router';
import {Overlay, OverlayModule} from '@angular/cdk/overlay';
import { CdkPortal, PortalModule } from '@angular/cdk/portal';
import { NotificacionesButtonComponent } from "../../../notificaciones/components/notificaciones-button/notificaciones-button.component";
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [MenuButtonComponent, FiltrosDeHiloComponent, RouterModule, OverlayModule, PortalModule, NotificacionesButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  auth = inject(AuthService);
  
}
