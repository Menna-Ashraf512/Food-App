import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.scss'],
})
export class ResetPassComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  isHide: boolean = true;
  isHideConfirmPassword: boolean = true;

  // -----------------------------------------------------------------------//
  ngOnInit() {
    const email = this.authService.email;
    if (email) {
      this.resetForm.patchValue({ email: email.trim() });
    }
  }
  resetForm = new FormGroup(
    {
      email: new FormControl<string | null>(null, [
        Validators.required,
        Validators.email,
      ]),
      seed: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{1,10}$/
        ),
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{1,10}$/
        ),
      ]),
    },
    { validators: this.confirmPassword }
  );

  resetPass(data: FormGroup) {
    this.authService.resetPass(data.value).subscribe({
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
          title: res.massage,
        });
      },
      error: (err) => {
        console.log(err);
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
        this.router.navigate(['/auth/login']);
      },
    });
  }

  confirmPassword(group: AbstractControl) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  }
  // -----------------------------------------------------------------------//
}
