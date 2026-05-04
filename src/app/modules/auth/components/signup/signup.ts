import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from "@angular/router";
import { AuthService } from '../../../../core/services/auth.service';
import { SignupPayload } from '../../../../core/models/auth.model';
import { ToastService } from '../../../../core/services/toast-service';
import { DestroyRef } from '@angular/core';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule, RouterModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  loading = signal(false);
  fb = inject(FormBuilder);
  destroyRef = inject(DestroyRef);

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  //DI
  authService = inject(AuthService);
  toastService = inject(ToastService);
  router = inject(Router);




  onSubmit() {
    if (this.form.invalid) return;

    const payload: SignupPayload = {
      name: this.form.value.name!,
      email: this.form.value.email!,
      password: this.form.value.password!
    };

    this.loading.set(true);

    this.authService.signup(payload)
      .pipe(
        finalize(() => this.loading.set(false))
      )
      .subscribe({
        next: () => this.handleSuccess(),
        error: (err) => this.handleError(err)
      });
  }


  private handleSuccess() {
    this.toastService.success("Successfully Signup", "Success");
    this.router.navigate(['/dashboard']);
  }

  private handleError(err: any) {
    const message = err?.error?.message || "Signup failed";
    this.toastService.error(message, "Error");
  }
}
