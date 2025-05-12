import { HttpClient } from '@angular/common/http';
import { Component, computed, inject, input, model, OnDestroy, OnInit, output, signal, WritableSignal } from '@angular/core';
import { Registro, UsuarioRegistro } from '../../interfaces/registro';
import { CommonModule } from '@angular/common';
import { DialogComponent } from "../../../../shared/components/dialog/dialog.component";
import { RegistroDeUsuarioComponent } from "../registro-de-usuario/registro-de-usuario.component";
import { ApiResponse } from '../../../application/interfaces/api-response.interface';
import { map } from 'rxjs';
import { FormSectionComponent } from "../../../../shared/components/form/form-section/form-section.component";
import { SeleccionarDuracionDeBaneoComponent } from "../seleccionar-duracion-de-baneo/seleccionar-duracion-de-baneo.component";
import { BanearUsuarioDialogComponent } from "../banear-usuario-dialog/banear-usuario-dialog.component";

@Component({
  selector: 'app-ver-registros-de-usuario-dialog',
  imports: [CommonModule, DialogComponent, RegistroDeUsuarioComponent, BanearUsuarioDialogComponent],
  templateUrl: './ver-registros-de-usuario-dialog.component.html',
  styleUrl: './ver-registros-de-usuario-dialog.component.css',
})
export class VerRegistrosDeUsuarioDialogComponent implements OnInit  {
  private http = inject(HttpClient)

  id = input.required<string>();

  onClose = output<void>();

  usuario = signal<UsuarioRegistro | undefined>(undefined); 

  registroSeleccionado  = signal<'hilos' | 'comentarios'>('hilos');

  hilosPosteados = signal<Registro[]>([]);
  comentariosEnviados = signal<Registro[]>([]);

  registros = computed<Registro[]>(() => {
    if(this.registroSeleccionado() === 'hilos') return this.hilosPosteados();

    return this.comentariosEnviados();
  })

  mostrarBanearUsuario = signal<boolean>(false);

  seleccionarRegistro(registro: 'hilos' | 'comentarios'): void {
    this.registroSeleccionado.set(registro);
  }

  ngOnInit(): void {
    this.http.get<ApiResponse<UsuarioRegistro>>(`/api/registros/usuario/${this.id()}`)
      .pipe(map(r => r.data)).subscribe(data => {
        this.usuario.set(data);
      
        var response = this.http.get<ApiResponse<Registro[]>>(`/api/registros/hilos-posteados/usuario/${this.id()}`)

        response.pipe(
          map(r => r.data)
        ).subscribe(registros => {
          this.hilosPosteados.update(r => [...r, ...registros])
        })
    
        var response = this.http.get<ApiResponse<Registro[]>>(`/api/registros/comentarios/usuario/${this.id()}`)
    
        response.pipe(
          map(r => r.data)
        ).subscribe(registros => {
          this.comentariosEnviados.update(r => [...r, ...registros])
        })
      }
    );
  }
}
