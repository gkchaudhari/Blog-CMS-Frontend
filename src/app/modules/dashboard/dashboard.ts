import { Component } from '@angular/core';
import { BlogList } from "../blog/blog-list/blog-list";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  imports: [BlogList, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard { }
