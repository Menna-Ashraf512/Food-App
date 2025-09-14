import { Component } from '@angular/core';
import { IRecipe, RecipeData, Tag } from '../../admin/interfaces/recipe';
import { environment } from 'src/app/core/environment/baseUrlImage';
import { ICategoryData } from '../../admin/interfaces/category';
import { RecipeUserService } from '../service/recipe-user.service';
import { CategoryService } from '../../admin/services/category.service';
import { FavoriteData } from '../interfaces/favorite';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes-user.component.html',
  styleUrls: ['./recipes-user.component.scss'],
})
export class RecipesComponent {
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
  favoriteIds: number[] = [];
  constructor(
    private recipeUserService: RecipeUserService,
    private categoryService: CategoryService
  ) {}
  ngOnInit(): void {
    this.getAllRecipes();
    this.getAllCategory();
    this.getTags();
  }
  getAllRecipes() {
    let recipeParam = {
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
      name: this.name,
      categoryId: this.selectedCat,
      tagId: this.selectedTag,
    };
    this.recipeUserService.getAllRecipes(recipeParam).subscribe({
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
        this.recipeUserService.getAllFavorite().subscribe((res) => {
          this.favoriteIds = res.data.map((fav: any) => fav.recipe?.id);
        });
      },
    });
  }

  openDeleteModal(id: number) {
    this.selectedItemId = id;
  }

  getTags() {
    this.recipeUserService.getAllTag().subscribe({
      next: (res) => {
        this.tagsList = res;
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

  addFavorite(id: number) {
    if (this.favoriteIds.includes(id)) {
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
        icon: 'warning',
        title: 'Already Added to Favorites ',
      });
      return;
    }
    this.recipeUserService.addFavorite(id).subscribe({
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
          title: 'Add Favorite successfully',
        });
      },
      complete: () => {
        this.closeModal();
        this.getAllRecipes();
      },
    });
  }
  //---------------- modal--------------//

  closeModal() {
    const modalEl = document.getElementById('AddFav');
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
