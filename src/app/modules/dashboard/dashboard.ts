import { Component } from '@angular/core';
import { BlogList } from "../blog/blog-list/blog-list";

@Component({
  selector: 'app-dashboard',
  imports: [BlogList],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {}
