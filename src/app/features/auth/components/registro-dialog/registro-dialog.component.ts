import { Component, inject, model } from '@angular/core';
import { DialogComponent } from "../../../../shared/components/dialog/dialog.component";
import { PasswordInputComponent } from "../password-input/password-input.component";
import { FormSectionComponent } from "../../../../shared/components/form/form-section/form-section.component";
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ApiResponse } from '../../../application/interfaces/api-response.interface';
import { map } from 'rxjs';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Component({
  selector: 'app-registro-dialog',
  imports: [DialogComponent, PasswordInputComponent, FormSectionComponent, ReactiveFormsModule],
  templateUrl: './registro-dialog.component.html',
  styleUrl: './registro-dialog.component.css',
})
export class RegistroDialogComponent {

  fb = inject(FormBuilder);

  form = this.fb.group({
    usuario: this.fb.control<string>(""),
    password: this.fb.control<string>(""),
    confirmacion: this.fb.control<string>("")
  })

  auth = inject(AuthService)

  http = inject(HttpClient);

  dialogRef = inject(DialogRef)

  dialog = inject(Dialog);

  registrarse() : void {
    this.http.post<ApiResponse<string>>('/api/auth/registrarse', {
      username: this.form.value.usuario!,
      password: this.form.value.password!
    }).pipe(
      map(response => response.data),
    ).subscribe((token) => {
      this.auth.token.set(token)
    
      this.dialogRef.close()
    });
  }

  mostrarLogin() : void {
    this.dialog.open(LoginDialogComponent);    
  }
}
