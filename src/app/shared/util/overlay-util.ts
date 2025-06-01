import { ComponentType, OverlayRef } from "@angular/cdk/overlay";
import { InjectionToken } from "@angular/core";

export declare const OVERLAY_DATA: InjectionToken<any>;

export interface OverlayConfiguration {}

class OverlayService {
    show<C = unknown>(overlayRef:OverlayRef, component: ComponentType<C>) :void{
        const close = () => overlayRef.dispose()

        overlayRef.attach(component)  

        document.addEventListener('scroll', close);

        overlayRef.backdropClick().subscribe(()=> {
            close()
        })

        overlayRef.detachments().subscribe(() => {
            document.removeEventListener('scroll', close);
        });
    }
}