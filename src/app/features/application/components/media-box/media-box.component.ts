import { Component, computed, input } from '@angular/core';
import { Media } from '../../interfaces/media.interface';

@Component({
  selector: 'app-media-box',
  imports: [],
  templateUrl: './media-box.component.html',
  styleUrl: './media-box.component.css',
})
export class MediaBoxComponent {

  static dimensionables :string [] = ['youtube', 'imagen', 'gif' ,'video', 'image'];

  media = input.required<Media>();

  dimensionbleOptions  = input<{ 
    class?: string,
    size? : {
          maxWidth? : string,
          maxHeight? : string
        }
  } >()

  esDimensionable = computed(()=> MediaBoxComponent.dimensionables.includes(this.media().provider));

  get esVideo ():boolean {
    return this.media().provider === "video";
  }

  get esImagen():boolean{
    return this.media().provider === 'imagen'  ||this.media().provider ==="image" || this.media().provider === "gif"
  }

  get esYoutube() :boolean {
    return this.media().provider === 'youtube';
  }
}
