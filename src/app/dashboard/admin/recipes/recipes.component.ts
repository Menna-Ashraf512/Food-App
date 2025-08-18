import { Component, OnInit } from '@angular/core';
import { RecipesService } from './service/recipes.service';
import { IRecipe, RecipeData, Tag } from './interfaces/recipe';
import Swal from 'sweetalert2';
import { CategoryService } from '../category/service/category.service';
import { ICategoryData } from '../category/interfaces/category';
import { environment } from 'src/app/core/environment/baseUrlImage';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit {
  listRecipe: RecipeData[] = [];
  allRecipe: RecipeData[] = [];
  recipeData!: IRecipe;
  pageSize!: number;
  pageNumber!: number;
  baseUrl = environment.baseUrl;
  selectedItemId!: number;
  name: string = '';
  selectedTag = '';
  selectedCat = '';
  tagsList: Tag[] = [];
  categoryList: ICategoryData[] = [];

  constructor(
    private recipesService: RecipesService,
    private categoryService: CategoryService
  ) {}
  ngOnInit(): void {
    this.getAllRecipes();
    this.getAllCategory();
    this.getTags();
  }
  getAllRecipes() {
    this.recipesService
      .getAllRecipes(this.pageSize, this.pageNumber, this.name)
      .subscribe({
        next: (res) => {
          this.recipeData = res;
          this.allRecipe = res.data.map((recipe: any) => {
            return {
              ...recipe,
              imagePath: recipe.imagePath
                ? this.baseUrl + recipe.imagePath
                : 'assets/images/img-recipe.jpg',
            };
          });
          this.listRecipe = [...this.allRecipe];
        },
      });
  }

  deleteItem(id: any) {
    this.recipesService.deleteRecipe(id).subscribe({
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
        this.getAllRecipes();
      },
    });
  }

  openDeleteModal(id: number) {
    this.selectedItemId = id;
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

  applyFilter() {
    this.listRecipe = this.allRecipe.filter((recipe) => {
      const matchTag = this.selectedTag
        ? recipe.tag?.id === Number(this.selectedTag)
        : true;

      const matchCat = this.selectedCat
        ? recipe.category.some((cat) => cat.id === Number(this.selectedCat))
        : true;

      return matchTag && matchCat;
    });
  }

  //---------------- modal--------------//

  closeModal() {
    const modalEl = document.getElementById('deleteItem');
    if (!modalEl) return;

    const modal = (window as any).bootstrap.Modal.getOrCreateInstance(modalEl);
    modal.hide();
  }

  handlePageEvent(e: any) {
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex + 1;
    this.getAllRecipes();
  }
}
