import { Component, signal, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Sidebar } from './sidebar/sidebar';
import { Navbar } from './navbar/navbar';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, Navbar, Sidebar, CommonModule, RouterOutlet,
    MatSidenavModule],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
sidenav = viewChild<MatSidenav>('sidenav');

  isOpen = signal(true);

  toggleSidebar() {
    this.isOpen.update(v => !v);
    this.sidenav()?.toggle();
  }
}