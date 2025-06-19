import { OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal, PortalModule } from '@angular/cdk/portal';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-custom-overlay',
  imports: [PortalModule],
  templateUrl: './custom-overlay.component.html',
  styleUrl: './custom-overlay.component.css',
})
export class CustomOverlayComponent {

  @ViewChild(CdkPortal) portal!: CdkPortal;

  overlayRef?: OverlayRef

  show(overlayRef: OverlayRef, config: OverlayConfiguration = { closeOnClickOutside: true, closeOnScroll: true }) {

    this.overlayRef = overlayRef

    const dispose = this.close.bind(this)

    overlayRef.overlayElement.classList.add("bg-red-500");

    const onDocumentClick = (event: MouseEvent) => {
      if (this.overlayRef && !this.overlayRef.overlayElement.contains(event.target as Node)) {
        dispose();
      }
    };

    document.addEventListener('mousedown', onDocumentClick);

    overlayRef.detachments().subscribe(() => {
      document.removeEventListener('mousedown', onDocumentClick);
    });

    overlayRef.attach(this.portal)  

    document.addEventListener('scroll', dispose);

    overlayRef.backdropClick().subscribe(()=> {
      dispose()
    })

    overlayRef.detachments().subscribe(() => {
      document.removeEventListener('scroll', dispose);
    });
  }

  close(){
    this.overlayRef?.dispose()
  }
}


interface OverlayConfiguration {
  closeOnClickOutside: boolean;
  closeOnScroll: boolean;
}