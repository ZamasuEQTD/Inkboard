import { Component, Inject, inject, input, model } from '@angular/core';
import { DialogComponent } from "../../../../shared/components/dialog/dialog.component";
import { PasswordInputComponent } from "../password-input/password-input.component";
import { FormSectionComponent } from "../../../../shared/components/form/form-section/form-section.component";
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../../application/interfaces/api-response.interface';
import { map } from 'rxjs';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { RegistroDialogComponent } from '../registro-dialog/registro-dialog.component';

@Component({
  selector: 'app-login-dialog',
  imports: [DialogComponent, PasswordInputComponent, FormSectionComponent, ReactiveFormsModule],
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.css',
})
export class LoginDialogComponent {
  dialogRef = inject(DialogRef);

  fb = inject(FormBuilder);

  form = this.fb.group({
    usuario : this.fb.control<string>(""),
    password : this.fb.control<string>("")
  })

  auth = inject(AuthService);

  http = inject(HttpClient);

  dialog = Inject(Dialog)

  mostrarRegistro(){
    this.dialog.open(RegistroDialogComponent);
  }

  login() :void {  
    this.http.post<ApiResponse<string>>('/api/auth/login', {
      username : this.form.value.usuario,
      password: this.form.value.password
    }).pipe(
      map(response => response.data),
    ).subscribe((token) => {
      this.auth.token.set(token);

      this.dialogRef.close();
    });
  }
}
