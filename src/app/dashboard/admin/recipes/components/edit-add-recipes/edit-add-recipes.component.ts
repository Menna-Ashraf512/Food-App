import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipesService } from '../../../services/recipes.service';
import { RecipeData, Tag } from '../../../interfaces/recipe';
import { CategoryService } from '../../../services/category.service';
import { ICategory, ICategoryData } from '../../../interfaces/category';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/app/core/environment/baseUrlImage';

@Component({
  selector: 'app-edit-add-recipes',
  templateUrl: './edit-add-recipes.component.html',
  styleUrls: ['./edit-add-recipes.component.scss'],
})
export class EditAddRecipesComponent implements OnInit {
  files: File[] = [];
  srcImg: any;
  selectedFile?: File;
  recipeId!: number;
  tagsList: Tag[] = [];
  categoryList: ICategoryData[] = [];
  recipeData!: RecipeData;
  baseUrl = environment.baseUrl;
  mode = this.activatedRoute.snapshot.url.some((x) => x.path === 'view');

  recipeForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl(0, Validators.required),
    tagId: new FormControl(0, Validators.required),
    categoriesIds: new FormControl([0], Validators.required),
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

  urlToFile(url: string, filename: string): Promise<File> {
    return fetch(this.baseUrl + url)
      .then((res) => res.blob())
      .then((blob) => new File([blob], filename, { type: blob.type }));
  }

  saveRecipe() {
    let recipeData = new FormData();
    let formValues: any = this.recipeForm.getRawValue();

    for (let key in formValues) {
      recipeData.append(key, String(formValues[key]));
    }

    if (this.selectedFile) {
      recipeData.append('recipeImage', this.selectedFile);
      this.submitRecipe(recipeData);
    } else if (this.recipeId && this.recipeData?.imagePath) {
      this.urlToFile(this.recipeData.imagePath, 'oldImage.jpg').then((file) => {
        recipeData.append('recipeImage', file);
        this.submitRecipe(recipeData);
      });
    } else {
      this.submitRecipe(recipeData);
    }
  }

  submitRecipe(formData: FormData) {
    const request = this.recipeId
      ? this.recipesService.updateRecipe(formData, this.recipeId)
      : this.recipesService.addRecipe(formData);

    request.subscribe({
      next: (res) => {
        console.log(res);
        Swal.fire({
          icon: 'success',
          title: 'Update recipe successfully',
          toast: true,
          position: 'top-end',
          timer: 1000,
          showConfirmButton: false,
        });
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: err.err.message,
          toast: true,
          position: 'top-end',
          timer: 1000,
          showConfirmButton: false,
        });
      },
      complete: () => this.router.navigate(['/dashboard/admin/recipes']),
    });
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
        if (this.recipeData?.imagePath) {
          this.srcImg = this.baseUrl + this.recipeData.imagePath;
        } else {
          this.srcImg = 'assets/images/img-recipe.jpg';
        }
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
      this.selectedFile = selectedFile;
    }
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }
}
