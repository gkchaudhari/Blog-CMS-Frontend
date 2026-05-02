import { getRouterModuleDeclaration } from '@angular/cdk/schematics';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from "@angular/router";

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



  onSubmit() {
    if (this.form.invalid) return;

    this.loading.set(true);

    console.log('Signup Data:', this.form.value);

    setTimeout(() => {
      this.loading.set(false);
    }, 1000);
  }
}
