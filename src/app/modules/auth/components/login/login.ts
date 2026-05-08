import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../../core/services/auth.service';
import { LoginPayload } from '../../../../core/models/auth.model';
import { Router, RouterModule } from "@angular/router";
import { ToastService } from '../../../../core/services/toast-service';

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
  toastService: ToastService = inject(ToastService);
  fb: FormBuilder = inject(FormBuilder);
  router: Router = inject(Router);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });


  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const payload = this.form.value as LoginPayload;
    this.authService.login(payload).subscribe({
      next: () => this.handleSuccess(),
      error: (err) => this.handleError(err)
    });
  }

  private handleSuccess() {
    this.toastService.success("Login Successful", "Success");
    this.router.navigate(['/dashboard']);
  }

  private handleError(err: any) {
    this.toastService.error(err.error.message, "Error while logining...");
    console.log(err.error.message);
  }
}
