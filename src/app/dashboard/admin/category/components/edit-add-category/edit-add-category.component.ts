import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CategoryService } from '../../service/category.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-add-category',
  templateUrl: './edit-add-category.component.html',
  styleUrls: ['./edit-add-category.component.scss'],
})
export class EditAddCategoryComponent implements OnChanges {
  constructor(private categoryService: CategoryService) {}

  @Input() itemId!: number;
  @Output() confirmEdit = new EventEmitter<number>();

  addItemForm = new FormGroup({
    name: new FormControl(null, Validators.required),
  });

  ngOnChanges(changes: SimpleChanges) {
    if (changes['itemId'] && this.itemId) {
      this.getItemById(this.itemId);
    } else {
      this.addItemForm.reset();
    }
  }

  getItemById(id: number) {
    this.categoryService.getCategoryById(id).subscribe({
      next: (res) => {
        this.addItemForm.patchValue({
          name: res.name,
        });
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  saveItem() {
    if (this.addItemForm.invalid) return;

    if (this.itemId) {
      this.updateItem();
    } else {
      this.addItem(this.addItemForm);
    }
  }

  addItem(data: FormGroup) {
    this.categoryService.AddCategory(data.value).subscribe({
      next: () => {
        this.showToast('success', 'Category added successfully');
      },
      error: (err) => {
        this.showToast('error', err.error.message);
      },
      complete: () => {
        this.closeModal();
        this.confirmEdit.emit();
      },
    });
  }

  updateItem() {
    this.categoryService
      .UpdateCategory(this.itemId, this.addItemForm.value)
      .subscribe({
        next: () => {
          this.showToast('success', 'Category updated successfully');
        },
        error: (err) => {
          this.showToast('error', err.error.message);
        },
        complete: () => {
          this.enhanceData();
          this.closeModal();
          this.confirmEdit.emit();
        },
      });
  }

  showToast(icon: 'success' | 'error', title: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
    Toast.fire({ icon, title });
  }

  closeModal() {
    const modalEl = document.getElementById('AddNewItem');
    if (!modalEl) return;
    const modal = (window as any).bootstrap.Modal.getOrCreateInstance(modalEl);
    modal.hide();
  }
  enhanceData() {
    this.addItemForm.reset();
    this.itemId = 0;
  }
}
