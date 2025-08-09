import { Component, OnInit } from '@angular/core';
import { CategoryService } from './service/category.service';
import { ICategory, ICategoryData } from './interfaces/category';
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
}
