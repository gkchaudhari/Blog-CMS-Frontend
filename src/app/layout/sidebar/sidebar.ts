import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';
interface NavItem {
  label: string;
  route: string;
  icon: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}
@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, MatSidenavModule, MatListModule, MatIconModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  @Input() open = true;
}
