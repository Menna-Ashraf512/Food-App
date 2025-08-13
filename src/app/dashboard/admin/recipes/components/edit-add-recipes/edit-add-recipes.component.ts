import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipesService } from '../../service/recipes.service';
import { RecipeData, Tag } from '../../interfaces/recipe';
import { CategoryService } from '../../../category/service/category.service';
import {
  ICategory,
  ICategoryData,
} from '../../../category/interfaces/category';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-add-recipes',
  templateUrl: './edit-add-recipes.component.html',
  styleUrls: ['./edit-add-recipes.component.scss'],
})
export class EditAddRecipesComponent implements OnInit {
  files: File[] = [];
  srcImg: any;
  recipeId!: number;
  tagsList: Tag[] = [];
  categoryList: ICategoryData[] = [];
  recipeData!: RecipeData;
  mode = this.activatedRoute.snapshot.url.some((seg) => seg.path === 'view');
  recipeForm = new FormGroup({
    name: new FormControl<string | null>(null, Validators.required),
    description: new FormControl<string | null>(null, Validators.required),
    price: new FormControl<number | null>(null, Validators.required),
    tagId: new FormControl<number | null>(null, Validators.required),
    categoriesIds: new FormControl<number[] | null>(null, Validators.required),
  });

  constructor(
    private recipesService: RecipesService,
    private categoryService: CategoryService,
    public activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.recipeId = this.activatedRoute.snapshot.params['id'];
    if (this.recipeId && this.mode) {
      this.getRecipeById(this.recipeId);
      this.recipeForm.disable();
    }
    if (this.recipeId) {
      this.getRecipeById(this.recipeId);
    }
  }
  ngOnInit(): void {
    this.getTags();
    this.getAllCategory();
  }
  // -----------------------------------------------------------------------//

  addNewRecipe(data: FormGroup) {
    let recipeData = new FormData();
    let formValues: any = this.recipeForm.getRawValue();

    for (let key in formValues) {
      recipeData.append(key, String(formValues[key]));
    }
    if (this.srcImg) {
      recipeData.append('recipeImage', this.srcImg);
    }
    // console.log(data.value);
    if (this.recipeId) {
      this.recipesService.updateRecipe(recipeData, this.recipeId).subscribe({
        next: (res) => {
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
            title: res.message,
          });
        },
        error: (err) => {
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
            icon: 'error',
            title: err.message,
          });
        },
        complete: () => {
          this.router.navigate(['/dashboard/admin/recipes']);
        },
      });
    } else {
      this.recipesService.addRecipe(recipeData).subscribe({
        next: (res) => {
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
            title: res.message,
          });
        },
        error: (err) => {
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
            icon: 'error',
            title: err.message,
          });
        },
        complete: () => {
          this.router.navigate(['/dashboard/admin/recipes']);
        },
      });
    }
  }

  getRecipeById(id: number) {
    this.recipesService.getRecipeById(this.recipeId).subscribe({
      next: (res) => {
        this.recipeData = res;
      },
      error(err) {
        console.log(err);
      },
      complete: () => {
        this.srcImg =
          'https://upskilling-egypt.com:3006/' + this.recipeData.imagePath;
        this.recipeForm.patchValue({
          name: this.recipeData.name,
          price: this.recipeData.price,
          description: this.recipeData.description,
          tagId: this.recipeData.tag.id,
          categoriesIds: this.recipeData.category.map(
            (category: ICategoryData) => category.id
          ),
        });
      },
    });
  }
  getTags() {
    this.recipesService.getAllTag().subscribe({
      next: (res) => {
        this.tagsList = res;
        console.log(res);
      },
    });
  }

  getAllCategory() {
    let categoryParam = {
      pageSize: 1000,
      pageNumber: 1,
    };
    this.categoryService.getAllCategory(categoryParam).subscribe({
      next: (res) => {
        this.categoryList = res.data;
      },
    });
  }

  // -----------------------------------------------------------------------//
  // dropZone
  onSelect(event: any) {
    const selectedFile = event.addedFiles[0];
    if (selectedFile) {
      this.files = [selectedFile];
    }
    this.srcImg = this.files[0];
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }
}
