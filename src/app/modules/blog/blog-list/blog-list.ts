import { Component, OnInit, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Blog } from '../../../core/models/blog.model';
import { BlogService } from '../../../core/services/blog-service';
import { ToastService } from '../../../core/services/toast-service';

@Component({
  selector: 'app-blog-list',
  imports: [DatePipe, MatTableModule, MatButtonModule, MatIconModule, MatPaginatorModule, MatDialogModule],
  templateUrl: './blog-list.html',
  styleUrl: './blog-list.css',
})
export class BlogList implements OnInit {
  private blogService = inject(BlogService);
  private toastService = inject(ToastService);
  private dialog = inject(MatDialog);

  // Using signals for reactive state management
  blogs = signal<Blog[]>([]);
  displayedColumns = signal<string[]>(['title', 'author', 'category', 'status', 'createdAt', 'updatedAt', 'actions']);
  totalBlogs = signal<number>(0);
  pageSize = signal<number>(10);
  currentPage = signal<number>(1);
  isLoading = signal<boolean>(false);

  ngOnInit(): void {
    this.loadBlogs();
  }

  loadBlogs(): void {
    this.isLoading.set(true);
    this.blogService.getBlogs(this.currentPage(), this.pageSize()).subscribe({
      next: (response) => {
        this.blogs.set(response.data);
        this.totalBlogs.set(response.total);
        this.isLoading.set(false);
        this.toastService.success(`Loaded ${response.data.length} blog(s)`, 'Blogs Loaded');
      },
      error: (error) => {
        console.error('Error loading blogs:', error);
        this.isLoading.set(false);
        this.toastService.error('Failed to load blogs. Please try again.', 'Error');
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage.set(event.pageIndex + 1);
    this.pageSize.set(event.pageSize);
    this.loadBlogs();
  }

  editBlog(blog: Blog): void {
    this.toastService.success(`Editing: ${blog.title}`, 'Edit Blog');
    // TODO: Implement edit navigation
    console.log('Edit blog:', blog);
  }

  deleteBlog(blog: Blog, index: number): void {
    // Confirm deletion
    const confirmed = confirm(`Are you sure you want to delete "${blog.title}"?`);
    if (!confirmed) return;

    this.isLoading.set(true);
    this.blogService.deleteBlog(blog.id).subscribe({
      next: () => {
        // Remove the deleted blog from the list using splice with direct index
        const currentBlogs = this.blogs();
        currentBlogs.splice(index, 1);
        this.blogs.set([...currentBlogs]);
        this.totalBlogs.set(this.totalBlogs() - 1);
        this.isLoading.set(false);
        this.toastService.success(`Deleted: ${blog.title}`, 'Blog Deleted');
      },
      error: (error) => {
        console.error('Error deleting blog:', error);
        this.isLoading.set(false);
        this.toastService.error(`Failed to delete ${blog.title}. Please try again.`, 'Delete Error');
      }
    });
  }
}

