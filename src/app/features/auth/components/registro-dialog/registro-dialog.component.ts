import { Component, inject, model } from '@angular/core';
import { DialogComponent } from "../../../../shared/components/dialog/dialog.component";
import { PasswordInputComponent } from "../password-input/password-input.component";
import { FormSectionComponent } from "../../../../shared/components/form/form-section/form-section.component";
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ApiResponse } from '../../../application/interfaces/api-response.interface';
import { map } from 'rxjs';

@Component({
  selector: 'app-registro-dialog',
  imports: [DialogComponent, PasswordInputComponent, FormSectionComponent, ReactiveFormsModule],
  templateUrl: './registro-dialog.component.html',
  styleUrl: './registro-dialog.component.css',
})
export class RegistroDialogComponent {
  visible = model.required<boolean>();

  fb = inject(FormBuilder);

  form = this.fb.group({
    usuario: this.fb.control<string>(""),
    password: this.fb.control<string>(""),
    confirmacion: this.fb.control<string>("")
  })

  login = model.required<boolean>();

  auth = inject(AuthService)

  http = inject(HttpClient);

  registrarse() : void {
    this.http.post<ApiResponse<string>>('/api/auth/registrarse', {
      username: this.form.value.usuario!,
      password: this.form.value.password!
    }).pipe(
      map(response => response.data),
    ).subscribe((token) => {
      this.auth.token.set(token)
    
      this.visible.set(false)
    });
  }
}
