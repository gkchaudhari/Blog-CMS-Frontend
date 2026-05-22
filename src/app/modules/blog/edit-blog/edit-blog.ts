import { Component, inject, input, OnInit, signal } from '@angular/core';
import { form, Field, FormField } from '@angular/forms/signals';
import { EditBlogForm } from '../../../core/models/form/edit-blog';
import { MatFormField, MatInputModule, MatLabel } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BlogService } from '../../../core/services/blog-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../core/services/toast-service';
import { catchError, EMPTY, exhaustMap, finalize, Subject, tap } from 'rxjs';

@Component({
  selector: 'app-edit-blog',
  imports: [
    MatFormField,
    MatInputModule,
    MatLabel,
    MatButtonModule,
    FormField
  ],
  templateUrl: './edit-blog.html',
  styleUrl: './edit-blog.css',
})
export class EditBlog implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  isSubmitting = signal(false);
  private blogService = inject(BlogService);
  private toastService = inject(ToastService);
  submit$ = new Subject<void>();

  isEditMode = signal(false);

  blogId = signal('');

  blogModel = signal<EditBlogForm>({
    title: '',
    content: '',
    status: 'draft',
    category: '',
    coverImageUrl: '',
    slug: ''
  });

  blogForm = form(this.blogModel);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('blogId');
    if (id) {
      this.isEditMode.set(true);
      this.blogId.set(id);
    }
    this.loadBlog();
    this.setSubjectValue();
  }

  onSubmit() {
    this.submit$.next();
  }

  loadBlog() {
    this.blogService.getBlogById(this.blogId()).subscribe((blog) => {
      this.blogModel.set({
        title: blog.title,
        content: blog.content,
        status: blog.status,
        category: blog.category,
        coverImageUrl: blog.coverImageUrl,
        slug: blog.slug
      });
    });
  }

  onReset() {
    this.blogModel.set({
      title: '',
      content: '',
      status: 'draft',
      category: '',
      coverImageUrl: '',
      slug: ''
    });
  }

  setSubjectValue() {
    this.submit$
      .pipe(
        exhaustMap(() => {
          this.isSubmitting.set(true);
          const request$ = this.isEditMode()
            ? this.blogService.updateBlog(
              this.blogId(),
              this.blogModel()
            )
            : this.blogService.createBlog(
              this.blogModel()
            );

          return request$.pipe(
            tap(() => {
              this.toastService.success(
                this.isEditMode()
                  ? 'Blog updated successfully'
                  : 'Blog created successfully',
                'Success'
              );
            }),

            catchError((error) => {
              this.toastService.error(
                error.message || 'Something went wrong',
                'Error'
              );
              return EMPTY;
            }),

            finalize(() => {
              this.isSubmitting.set(false);
            })
          );
        })
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/blogs']);
        }
      });
  }

}

