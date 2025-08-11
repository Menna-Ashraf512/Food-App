import { Component, OnInit } from '@angular/core';
import { CategoryService } from './service/category.service';
import { ICategory, ICategoryData } from './interfaces/category';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  pageSize!: number;
  pageNumber!: number;
  name: string = '';
  listCategory: ICategoryData[] = [];
  CategoryData!: ICategory;
  selectedItemId!: number;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getAllCategory();
  }

  getAllCategory() {
    let categoryParam = {
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
      name: this.name,
    };
    this.categoryService.getAllCategory(categoryParam).subscribe({
      next: (res) => {
        this.listCategory = res.data;
        this.CategoryData = res;
      },
    });
  }

  handlePageEvent(e: any) {
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex;
    this.getAllCategory();
  }

  openDeleteModal(id: number) {
    this.selectedItemId = id;
  }

  deleteItem(id: any) {
    this.categoryService.DeleteCategory(id).subscribe({
      next: () => {
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
          title: 'Deleted is Successfully',
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
        this.getAllCategory();
      },
    });
  }

  // modal

  closeModal() {
    const modalEl = document.getElementById('deleteItem');
    if (!modalEl) return;

    const modal = (window as any).bootstrap.Modal.getOrCreateInstance(modalEl);
    modal.hide();
  }
}
