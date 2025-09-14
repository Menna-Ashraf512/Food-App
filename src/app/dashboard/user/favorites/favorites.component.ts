import { Component, OnInit } from '@angular/core';
import { RecipeUserService } from '../service/recipe-user.service';
import { FavoriteData, IFavorite } from '../interfaces/favorite';
import { environment } from 'src/app/core/environment/baseUrlImage';
import { Tag } from '../../admin/interfaces/recipe';
import { ICategoryData } from '../../admin/interfaces/category';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  favData!: IFavorite;
  favList: FavoriteData[] = [];
  allFav!: FavoriteData[];
  pageSize: number = 10;
  pageNumber: number = 1;
  isTable = true;
  baseUrl = environment.baseUrl;
  selectedItemId!: number;
  name: string = '';
  selectedTag = '';
  selectedCat = '';
  tagsList: Tag[] = [];
  categoryList: ICategoryData[] = [];

  constructor(private recipeUserService: RecipeUserService) {}

  ngOnInit(): void {
    this.getAllFavorite();
    this.getAllCategory();
    this.getTags();
  }
  getAllFavorite() {
    this.recipeUserService.getAllFavorite().subscribe({
      next: (res) => {
        this.allFav = res.data;
        this.favList = res.data;
        this.favData = res;
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
      error: (err) => {
        console.error('Error while fetching tags:', err);
      },
    });
  }

  getAllCategory() {
    let categoryParam = {
      pageSize: 1000,
      pageNumber: 1,
    };
    this.recipeUserService.getAllCategory(categoryParam).subscribe({
      next: (res) => {
        this.categoryList = res.data;
      },
    });
  }

  applyFilter() {
    this.favList = this.allFav.filter((fav) => {
      const matchTag = this.selectedTag
        ? fav.recipe.tag?.id === Number(this.selectedTag)
        : true;

      const matchCat = this.selectedCat
        ? fav.recipe.category.some((cat) => cat.id === Number(this.selectedCat))
        : true;

      return matchTag && matchCat;
    });
  }

  deleteFavorite(id: number) {
    Swal.fire({
      title: 'Delete this item?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      customClass: {
        confirmButton: 'btn btn-danger btn-sm mx-2',
        cancelButton: 'btn btn-secondary btn-sm',
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this.recipeUserService.deleteFavorite(id).subscribe({
          next: () => {
            Swal.fire({
              title: 'Deleted',
              icon: 'success',
              showConfirmButton: false,
              timer: 1200,
            });
          },
          error: () => {
            Swal.fire({
              title: 'Error',
              text: 'Could not delete.',
              icon: 'error',
            });
          },
          complete: () => {
            this.getAllFavorite();
          },
        });
      }
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
    this.getAllFavorite();
  }
}
