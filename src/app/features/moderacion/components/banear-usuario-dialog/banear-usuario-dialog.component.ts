import { Component, computed, inject, model, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DialogComponent } from "../../../../shared/components/dialog/dialog.component";
import { FormSectionComponent } from "../../../../shared/components/form/form-section/form-section.component";
import { SeleccionarDuracionDeBaneoComponent } from "../seleccionar-duracion-de-baneo/seleccionar-duracion-de-baneo.component";
import { CommonModule } from '@angular/common';
import { SeleccionarRazonDeBaneoComponent } from "../seleccionar-razon-de-baneo/seleccionar-razon-de-baneo.component";
import { HttpClient } from '@angular/common/http';
import { Dialog, DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-banear-usuario-dialog',
  imports: [DialogComponent, FormSectionComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './banear-usuario-dialog.component.html',
  styleUrl: './banear-usuario-dialog.component.css',
})
export class BanearUsuarioDialogComponent { 
    private http = inject(HttpClient);
    private fb = inject(FormBuilder);

    dialogRef = inject(DialogRef);

    dialog = inject(Dialog)

    form = this.fb.group({
      mensaje: this.fb.control<string >(""),
      razon: this.fb.control<number | undefined>(undefined),
      duracion: this.fb.control<number | undefined>(undefined)
    })

    mostrarRazones () {
     let ref =  this.dialog.open(SeleccionarRazonDeBaneoComponent,{data:{
        onRazonSeleccionada : (idx:number) => {
          this.form.patchValue({
            razon:idx
          })

          ref.close();
        }
      }})
    }
    
    mostrarDuraciones (){
      let ref = this.dialog.open(SeleccionarDuracionDeBaneoComponent, {data:{
        onDuracionSeleccionada : (idx:number) => {
          this.form.patchValue({
            duracion:idx
          })
          ref.close()
        }
      }})
    };

    get duraciones() : string [] { 
      return SeleccionarDuracionDeBaneoComponent.DURATIONS;
    }

    get razones() : string []{
      return SeleccionarRazonDeBaneoComponent.RAZONES;
    }

    banear() : void {
      this.http.post("",{}).subscribe((response)=> {
        this.dialogRef.close();
      });
    }
}
