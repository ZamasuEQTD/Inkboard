import { Component, inject, OnInit, signal } from '@angular/core';
import { HeaderComponent } from "../../../application/components/header/header.component";
import { PortadasComponent } from "../../../hilos/components/portadas/portadas.component";
import { Portada } from '../../../hilos/interfaces/portada.interface';
import { PostearHiloButtonComponent } from "../../components/postear-hilo-button/postear-hilo-button.component";
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../../application/interfaces/api-response.interface';
import { map } from 'rxjs';

@Component({
  selector: 'app-home-page',
  imports: [HeaderComponent, PortadasComponent, PostearHiloButtonComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit{
 
  portadas = signal<Portada[]>([]);

  cargandoPortadas = signal(false);

  private readonly http = inject(HttpClient);

  ngOnInit(): void {
    this.cargandoPortadas.set(true);
    this.http.get<ApiResponse<Portada[]>>("/api/hilos")
    .pipe(
      map((response)=> response.data),
    ).subscribe((portadas) => {
      this.portadas.set(portadas);
      this.cargandoPortadas.set(false);
    });
  }
}
