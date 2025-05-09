import { Component, input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-password-input',
  imports: [ReactiveFormsModule],
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.css',
})
export class PasswordInputComponent {

  control = input.required<FormControl<string | null>>();

  visible = signal(false);

  toggleVisible(): void {
    this.visible.update((visible) => !visible);
  }
}
