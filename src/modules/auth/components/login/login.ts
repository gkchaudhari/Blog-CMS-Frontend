import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
   loading = signal(false);

  fb = inject(FormBuilder);
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });


  onSubmit() {
    if (this.form.invalid) return;

    this.loading.set(true);

    console.log('Login Data:', this.form.value);

    setTimeout(() => {
      this.loading.set(false);
    }, 1000);
  }
}
