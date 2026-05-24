import { Component, computed, effect, inject, signal, viewChild } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbar } from "@angular/material/toolbar";
import { MatIcon } from "@angular/material/icon";
import { MatNavList } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";
import { AuthService } from '../core/services/auth.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule,
    MatSidenavModule, MatToolbar, MatIcon, MatNavList, MatButtonModule, MatTooltipModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  sidenav = viewChild<MatSidenav>('sidenav');
  isLoggedIn = computed(() => this.authService.isLoggedIn());
  isOpen = signal(false);

  //DI
  router = inject(Router);
  authService = inject(AuthService);

  currentUser = computed(() => this.authService.getCurrentUser());

  constructor() {
    effect(() => {
      console.log("effect runs", this.isLoggedIn());
    })
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}