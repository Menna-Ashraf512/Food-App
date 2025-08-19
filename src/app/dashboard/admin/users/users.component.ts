import { Component } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
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
  pageSize: number = 5;
  pageNumber: number = 1;
  baseUrl = environment.baseUrl;
  selectedUserId!: number;
  searchKey: string = 'userName';
  searchName: string = '';

  role: string = '';

  constructor(private usersService: UsersService) {}
  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    let usersParam = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      [this.searchKey]: this.searchName,
      groups: this.role,
    };
    this.usersService.getAllUsers(usersParam).subscribe({
      next: (res) => {
        this.userData = res;
        this.userList = res.data;
        console.log(this.userList);
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
