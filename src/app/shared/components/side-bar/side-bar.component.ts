import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import Swal from 'sweetalert2';

interface IMenu {
  title: string;
  icon: string;
  menuLink: string;
  isActive: boolean;
}

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent {
  hovered: boolean = false;
  isHide: boolean = true;

  constructor(private authService: AuthService) {}

  //change password formGroup
  changeForm = new FormGroup(
    {
      oldPassword: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{1,10}$/
        ),
      ]),
      newPassword: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{1,10}$/
        ),
      ]),
      confirmNewPassword: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{1,10}$/
        ),
      ]),
    },
    { validators: this.confirmPassword }
  );

  // validation confirm Password
  confirmPassword(group: AbstractControl) {
    const newPassword = group.get('newPassword')?.value;
    const confirmNPassword = group.get('confirmNewPassword')?.value;

    return newPassword === confirmNPassword ? null : { mismatch: true };
  }

  // --------------------------------------------------------//

  // function change password
  changePass(data: FormGroup) {
    this.authService.changePass(data.value).subscribe({
      next: (res) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 1500,
        });
      },
      error: (err) => {
        console.log();
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
          title: err.error.message,
        });
      },
      complete: () => {
        this.closeModal();
        this.changeForm.reset();
      },
    });
  }

  // --------------------------------------------------------//
  // modal
  declare bootstrap: any;

  closeModal() {
    const modalElement = document.getElementById('staticBackdrop');
    if (modalElement) {
      let modalInstance = (window as any).bootstrap.Modal.getInstance(
        modalElement
      );

      if (!modalInstance) {
        modalInstance = new (window as any).bootstrap.Modal(modalElement);
      }

      modalInstance.hide();
    }
  }

  // --------------------------------------------------------//

  isAdmin(): boolean {
    return localStorage.getItem('role') === 'SuperAdmin' ? true : false;
  }
  isUser(): boolean {
    return localStorage.getItem('role') === 'SystemUser' ? true : false;
  }
  //list
  menu: IMenu[] = [
    {
      title: 'Home',
      icon: 'fa-house',
      menuLink: '/dashboard',
      isActive: this.isAdmin() || this.isUser(),
    },
    {
      title: 'Users',
      icon: 'fa-users',
      menuLink: '/dashboard/home',
      isActive: this.isAdmin(),
    },
    {
      title: 'Recipes',
      icon: 'fa-border-all',
      menuLink: '/dashboard/admin/recipes',
      isActive: this.isAdmin(),
    },
    {
      title: 'Categories',
      icon: 'fa-clipboard-list',
      menuLink: '/dashboard/admin/category',
      isActive: this.isAdmin(),
    },
    {
      title: 'Favorites',
      icon: 'fa-heart',
      menuLink: '/dashboard/home',
      isActive: this.isUser(),
    },
  ];
}
