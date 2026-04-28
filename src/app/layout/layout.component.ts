import { Component, signal, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Sidebar } from './sidebar/sidebar';
import { Navbar } from './navbar/navbar';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbar } from "@angular/material/toolbar";
import { MatIcon } from "@angular/material/icon";
import { MatNavList } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, Navbar, Sidebar, CommonModule, RouterOutlet,
    MatSidenavModule, MatToolbar, MatIcon, MatNavList, MatButtonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  sidenav = viewChild<MatSidenav>('sidenav');
  isLoggedIn = signal<boolean>(false);
  isOpen = signal(false);
}