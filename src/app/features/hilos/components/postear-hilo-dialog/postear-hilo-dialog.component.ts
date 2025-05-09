import { Component, inject, model, signal } from '@angular/core';
import { DialogComponent } from "../../../../shared/components/dialog/dialog.component";
import { FormSectionComponent } from "../../../../shared/components/form/form-section/form-section.component";
import { CrearEncuestaComponent } from "../../../encuesta/components/crear-encuesta/crear-encuesta.component";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PickFileComponent } from "../../../../shared/components/pick-file/pick-file.component";
import { PickedMedia } from '../../../../shared/interfaces/picked-media.interface';
import { MediaBoxComponent } from "../../../application/components/media-box/media-box.component";
import { Media } from '../../../application/interfaces/media.interface';
import { BlurAdvertenciaComponent } from "../../../../shared/components/blur-advertencia/blur-advertencia.component";
import { Subcategoria } from '../../../categorias/interfaces/categoria.interface';
import { SeleccionarSubcategoriaDialogComponent } from "../../../categorias/components/seleccionar-subcategoria-dialog/seleccionar-subcategoria-dialog.component";
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../../application/interfaces/api-response.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-postear-hilo-dialog',
  imports: [
    CommonModule,
    DialogComponent,
    FormSectionComponent,
    CrearEncuestaComponent,
    ReactiveFormsModule,
    PickFileComponent,
    MediaBoxComponent,
    SeleccionarSubcategoriaDialogComponent
],
  templateUrl: './postear-hilo-dialog.component.html',
  styleUrl: './postear-hilo-dialog.component.css',
})
export class PostearHiloDialogComponent {
  private fb: FormBuilder = inject(FormBuilder);
  private http = inject(HttpClient)
  private router = inject(Router);

  visible = model.required<boolean>();

  agregarEnlace = signal(false);

  form = this.fb.group({
    titulo : this.fb.control<string>(''),
    descripcion : this.fb.control<string>(''),
    encuesta: this.fb.array<string[]>([]),
    embed : this.fb.control<string>('', [Validators.required]),
    portada: this.fb.control<PickedMedia | null>(null),
    subcategoria: this.fb.control<Subcategoria | null>(null),
    dados :this.fb.control<boolean>(false),
    idUnico :this.fb.control<boolean>(false)

  });

  posteando = signal(false);

  seleccionarSubcategoria = signal<boolean>(false);

  agregarPortada(portada : PickedMedia) :void {
    this.form.controls.portada.setValue(portada);
  }

  toggleEnlace() : void {
    this.agregarEnlace.update((value)=> !value);
  }

  postear(): void {
    if(this.posteando()) return;

    var data = new FormData();

    let values =this.form.value;

    data.append("titulo", values.titulo!)

    data.append("descripcion", values.descripcion!)

    data.append("subcategoria",  values.subcategoria!.id || "");
    data.append("DadosActivados", values.dados!.toString());

    data.append("IdUnicoActivado", values.idUnico!.toString());


    let portada = values.portada;

    if (portada) {
      if (this.form.controls.embed?.valid) {
        data.append("Embed", values.embed || "");
      } else {
        data.append("File", values.portada!.file!);
      }

      data.append("Spoiler", values.portada!.spoiler.toString());
    }


    this.posteando.set(true);

    this.http.post<ApiResponse<string>>("/api/hilos/postear", data).subscribe((response) => {
      const hiloId = response.data;
      
      this.visible.set(false)

      this.router.navigate(["/hilo/", hiloId]);
    });
  }

  get existePortada() : boolean {
    return this.form.value.portada !== null;
  }
  get haySubcategoriaSeleccionada ():boolean {
    return this.form.value.subcategoria !== null
  }

  get media() : Media {

    let portada  = this.form.value.portada!;

    return {
      provider: portada.type!,
      spoiler : this.form.value.portada!.spoiler!,
      url : this.form.value.portada!.source!
    };
  }

}
