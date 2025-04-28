import { Component, input } from '@angular/core';
import { PickedMedia } from '../../interfaces/picked-media.interface';

@Component({
  selector: 'app-picked-media-thumbnail',
  imports: [],
  templateUrl: './picked-media-thumbnail.component.html',
  styleUrl: './picked-media-thumbnail.component.css',
})
export class PickedMediaThumbnailComponent {
  media = input.required<PickedMedia>();
}
