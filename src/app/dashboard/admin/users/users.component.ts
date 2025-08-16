import { Component, OnInit } from '@angular/core';
// import { RecipesService } from '../recipes/service/';
import { IRecipe, RecipeData, Tag } from '../recipes/interfaces/recipe';
import Swal from 'sweetalert2';
import { CategoryService } from '../category/service/category.service';
import { ICategoryData } from '../category/interfaces/category';
import { RecipesService } from '../recipes/service/recipes.service';
import { environment } from 'src/app/core/environment/baseUrlImage';
import { UsersService } from './service/users.service';
import { userData, Users } from './interface/users';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  userData!: Users;
  userList: userData[] = [];
  pageSize!: number;
  pageNumber!: number;
  baseUrl = environment.baseUrl;
  selectedUserId!: number;
  userName: string = '';

  constructor(private usersService: UsersService) {}
  ngOnInit(): void {
    this.getAllUsers();
  }
  getAllUsers() {
    this.usersService
      .getAllUsers(this.pageSize, this.pageNumber, this.userName)
      .subscribe({
        next: (res) => {
          this.userData = res;
          console.log(this.userData);
          this.userList = res.data.map((users: any) => {
            return {
              ...users,
              imagePath: this.baseUrl + users.imagePath,
            };
          });
        },
      });
  }
  viewUser(id: number) {
    this.usersService.getUserById(id).subscribe({
      next: (res) => {
        this.userData = res;
      },
    });
  }

  deleteItem(id: number) {
    this.usersService.deleteUsers(id).subscribe({
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
        this.getAllUsers();
      },
    });
  }

  openDeleteModal(id: number) {
    this.selectedUserId = id;
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
    this.getAllUsers();
  }
}
