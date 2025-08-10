import { Component } from '@angular/core';
import { CategoryService } from '../../service/category.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-add-category',
  templateUrl: './edit-add-category.component.html',
  styleUrls: ['./edit-add-category.component.scss'],
})
export class EditAddCategoryComponent {
  constructor(private categoryService: CategoryService) {}
  addItemForm = new FormGroup({
    name: new FormControl(null, Validators.required),
  });

  AddItem(addItemForm: any) {
    this.categoryService.AddCategory(addItemForm).subscribe({
      next: (res) => {
        console.log(res);
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: 'success',
          title: 'Add is Successfully',
        });
      },
      error: (err) => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: 'error',
          title: err.error.message,
        });
      },
      complete: () => {
        this.closeModal();
      },
    });
  }

  // modal

  closeModal() {
    const modalEl = document.getElementById('AddNewItem');
    if (!modalEl) return;

    const modal = (window as any).bootstrap.Modal.getOrCreateInstance(modalEl);
    modal.hide();
  }
}
