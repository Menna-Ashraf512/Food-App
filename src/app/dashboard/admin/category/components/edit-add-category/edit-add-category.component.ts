import { Component } from '@angular/core';
import { CategoryService } from '../../service/category.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
      },
    });
  }
}
