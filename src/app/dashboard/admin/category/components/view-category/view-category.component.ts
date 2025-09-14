import { Component, Input, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/dashboard/admin/services/category.service';

@Component({
  selector: 'app-view',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.scss'],
})
export class ViewComponent {
  constructor(private categoryService: CategoryService) {}

  @Input() itemId!: number;

  ViewItem = new FormGroup({
    name: new FormControl(null, Validators.required),
    id: new FormControl(null, Validators.required),
    modificationDate: new FormControl(null, Validators.required),
    creationDate: new FormControl(null, Validators.required),
  });

  ngOnChanges(changes: SimpleChanges) {
    if (changes['itemId'] && this.itemId) {
      this.getItemById(this.itemId);
    }
  }

  getItemById(id: number) {
    this.ViewItem.disable();
    this.categoryService.getCategoryById(id).subscribe({
      next: (res) => {
        console.log(res);
        this.ViewItem.patchValue({
          name: res.name,
          id: res.id,
          modificationDate: res.modificationDate,
          creationDate: res.creationDate,
        });
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
