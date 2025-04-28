import { Component, inject } from '@angular/core';
import { HiloPageService } from '../../services/hilo-page.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PickedMedia } from '../../../../shared/interfaces/picked-media.interface';
import { PickFileComponent } from "../../../../shared/components/pick-file/pick-file.component";
import { PickedMediaThumbnailComponent } from "../../../../shared/components/picked-media-thumbnail/picked-media-thumbnail.component";

@Component({
  selector: 'comentar-hilo',
  imports: [ReactiveFormsModule, CommonModule, PickFileComponent, PickedMediaThumbnailComponent],
  templateUrl: './comentar-hilo.component.html',
  styleUrl: './comentar-hilo.component.css',
})
export class ComentarHiloComponent {
  hiloPageService = inject(HiloPageService);

  form = this.hiloPageService.comentarHiloForm;

  get textoControl(): FormControl {
    return this.form.get('texto') as FormControl;
  }

  get pickedFiles () : PickedMedia[] {
    return this.form.value.files!;
  }


  agregarArchivo(archivo: PickedMedia) : void {
    const archivos = this.form.value.files || [];

    this.form.patchValue({
      files: [...archivos, archivo],
    });
  }

  eliminarArchivo(index : number) : void {
    const archivos = this.form.value.files || [];

    archivos.splice(index, 1);

    this.form.patchValue({
      files: [...archivos],
    });
  }
}
