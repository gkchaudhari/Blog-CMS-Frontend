import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../../core/services/auth.service';
import { LoginPayload } from '../../../../core/models/auth.model';
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loading = signal<boolean>(false);

  //DI Injection
  authService: AuthService = inject(AuthService);
  fb: FormBuilder = inject(FormBuilder);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit() {
    const payload = this.form.value as LoginPayload;
    this.authService.login(payload).subscribe({
      next: () => {

      },
      error: (err) => {
        console.log(err);
      }
    });




  }
}
