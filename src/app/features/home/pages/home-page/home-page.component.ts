import { Component } from '@angular/core';
import { HeaderComponent } from "../../../application/components/header/header.component";
import { PortadasComponent } from "../../../hilos/components/portadas/portadas.component";
import { Portada } from '../../../hilos/interfaces/portada.interface';
import { PostearHiloButtonComponent } from "../../components/postear-hilo-button/postear-hilo-button.component";

@Component({
  selector: 'app-home-page',
  imports: [HeaderComponent, PortadasComponent, PostearHiloButtonComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  portadas:Portada[] = [
    {
      id: "12345",
    autor_id: "67890",
    recibir_notificaciones: true,
    es_op: false,
    es_nuevo: true,
    titulo: "Título de ejemplo",
    subcategoria: "NSFW",
    miniatura: {
        spoiler: true,
        url: "https://static1.srcdn.com/wordpress/wp-content/uploads/2024/04/goku-offers-his-ice-cream-to-an-upset-pan-in-dragon-ball-z-1-2.jpg"
    },
    banderas: {
        es_sticky: false,
        tiene_encuesta: false,
        dados_activado: true,
        id_unico_activado: false
    }
    }
  ];
}
