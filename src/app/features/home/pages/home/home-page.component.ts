import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { HeaderComponent } from "../../../application/components/header/header.component";
import { PortadasComponent } from "../../../hilos/components/portadas/portadas.component";
import { Portada } from '../../../hilos/interfaces/portada.interface';
import { PostearHiloButtonComponent } from "../../components/postear-hilo-button/postear-hilo-button.component";
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../../application/interfaces/api-response.interface';
import { map } from 'rxjs';
import { FiltrosDeHiloComponent } from "../../../application/components/filtros-de-hilo/filtros-de-hilo.component";
import { ActivatedRoute } from '@angular/router';
import { HomeSignalrService } from '../../services/home-signalr.service';

@Component({
  selector: 'app-home-page',
  imports: [HeaderComponent, PortadasComponent, PostearHiloButtonComponent, FiltrosDeHiloComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit, OnDestroy{

  ngOnDestroy(): void {
    this.signalr.stop()
  }
 
  portadas = signal<Portada[]>([]);

  cargandoPortadas = signal(false);

  private readonly http = inject(HttpClient);

  private readonly router = inject(ActivatedRoute);

  private readonly signalr = inject(HomeSignalrService)

  ngOnInit(): void {
    this.cargandoPortadas.set(true);
    
    this.signalr.start(()=> {
      this.signalr.addOnHiloEliminadoListener((id:string)=>{
        this.portadas.update((portadas)=> portadas.filter((p)=> p.id !== id));
      });

      this.signalr.addOnHiloPosteadoListener((portada)=> {
        this.portadas.update((portadas)=> [portada,...portadas])
      })
    });

    this.router.queryParams.subscribe((params)=> {
      this.http.get<ApiResponse<Portada[]>>("/api/hilos", {
        params : {
          titulo : params["titulo"]?? ""
        }
      })
    .pipe(
      map((response)=> response.data),
    ).subscribe((portadas) => {
      this.portadas.set(portadas);
      this.cargandoPortadas.set(false);
    });
    })
  }

  cargarPortadas(){
    if(this.cargandoPortadas()) return;

    this.cargandoPortadas.set(true)
    this.router.queryParams.subscribe((params)=> {
      this.http.get<ApiResponse<Portada[]>>("/api/hilos", {
        params : {
          titulo : params["titulo"]?? "",
          ultimaPortada: this.portadas().at(this.portadas().length - 1)?.id ?? ''
        }
      })
    .pipe(
      map((response)=> response.data),
    ).subscribe((portadass) => {
      this.portadas.update((p)=> [...p,...portadass]);

      this.cargandoPortadas.set(false);
    });
    })
  }
}
