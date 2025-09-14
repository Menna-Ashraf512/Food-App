import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { AuthService } from '../../../core/service/auth.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss'],
})
export class ChangePassComponent {
  isHide: boolean = true;
  isHideNew: boolean = true;
  isHideConfirm: boolean = true;

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
    if (!modalElement) return;

    const modal = (window as any).bootstrap.Modal.getOrCreateInstance(
      modalElement
    );
    modal.hide();
  }
}
