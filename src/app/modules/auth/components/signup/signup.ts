import { getRouterModuleDeclaration } from '@angular/cdk/schematics';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from "@angular/router";
import { AuthService } from '../../../../core/services/auth.service';
import { SignupPayload } from '../../../../core/models/auth.model';

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

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  //DI
  authService = inject(AuthService);
  router = inject(Router);



  onSubmit() {
    // if (this.form.invalid) return;

    const payload = this.form.value as SignupPayload;

    this.authService.signup(payload).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
