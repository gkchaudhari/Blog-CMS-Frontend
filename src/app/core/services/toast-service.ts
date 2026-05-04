import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toastService = inject(ToastrService);

  success(message: string, title: string) {
    this.toastService.success(message, title);
  }

  error(message: string, title: string) {
    this.toastService.error(message, title);
  }
}
