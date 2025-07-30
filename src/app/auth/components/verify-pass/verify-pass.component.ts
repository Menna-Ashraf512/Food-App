import { Component } from '@angular/core';
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
  selector: 'app-verify-pass',
  templateUrl: './verify-pass.component.html',
  styleUrls: ['./verify-pass.component.scss'],
})
export class VerifyPassComponent {
  message: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  verifyForm = new FormGroup({
    email: new FormControl<string | null>(null, [
      Validators.required,
      Validators.email,
    ]),
    code: new FormControl(null, [Validators.required]),
  });

  ngOnInit() {
    const email = localStorage.getItem('emailToVerify');
    if (email) {
      this.verifyForm.patchValue({ email: email.trim() });
    }
  }

  verify(data: FormGroup) {
    this.authService.verify(data.value).subscribe({
      next: (res) => {
        this.verifyForm.reset();
        this.message = res.message;
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
          title: err.error?.message || 'Something went wrong',
        });
      },
      complete: () => {
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
          title: this.message,
        }).then(() => {
          this.router.navigate(['/auth/login']);
        });
      },
    });
  }
}
