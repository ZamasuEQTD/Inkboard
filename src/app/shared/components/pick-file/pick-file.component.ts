import { Component, ElementRef, output, ViewChild } from '@angular/core';
import { PickedMedia } from '../../interfaces/picked-media.interface';

@Component({
  selector: 'app-pick-file',
  imports: [],
  templateUrl: './pick-file.component.html',
  styleUrl: './pick-file.component.css',
})
export class PickFileComponent {
  onPickedFile = output<PickedMedia>();

  @ViewChild('inputRef') ref !: ElementRef<HTMLInputElement>

  pick() : void {
    this.ref.nativeElement.click()
  }

  clear() : void {
    this.ref.nativeElement.value ='';
  }

  onPicked(event: any) :void{
    const files :FileList = event.target.files;

    const file : File = files[0];

    const reader = new FileReader();

    console.log(file);

    reader.onload = (e: ProgressEvent<FileReader>) => {
      let type :string = file.type.split('/')[0].toLowerCase();

      this.onPickedFile.emit({
        type : type === 'image'? 'imagen' : type,
        source :  reader.result! as string,
        file: file,
        spoiler:false
      });
    }

    reader.readAsDataURL(file);
  }

  capitalize(type:string) : string {
    return type.charAt(0).toUpperCase() + type.slice(1);
  }
}
