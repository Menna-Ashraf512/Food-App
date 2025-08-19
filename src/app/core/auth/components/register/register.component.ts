import { Component } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(private authService: AuthService, private router: Router) {}

  isHide: boolean = true;
  isLoading = false;
  isHideConfirmPassword: boolean = true;
  files: File[] = [];
  srcImg: any;

  // -----------------------------------------------------------------------//

  registerForm = new FormGroup(
    {
      email: new FormControl(null, [Validators.required, Validators.email]),
      userName: new FormControl(null, [
        Validators.required,
        Validators.maxLength(8),
        Validators.pattern(/^[A-Za-z]{1,7}[0-9]{1}$/),
      ]),
      country: new FormControl(null, [Validators.required]),
      phoneNumber: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
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

  register(data: FormGroup) {
    this.isLoading = true;
    let myData = new FormData();
    let formValues: any = this.registerForm.getRawValue();

    for (let key in formValues) {
      myData.append(key, String(formValues[key]));
    }
    if (this.srcImg) {
      myData.append('profileImage', this.srcImg);
    }

    this.authService.register(myData).subscribe({
      next: (res) => {
        const email = this.registerForm.get('email')?.value || '';
        if (email) {
          this.authService.email = email;
        }
        this.registerForm.reset();
      },
      error: (err) => {
        this.isLoading = false;

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
        this.isLoading = false;
        this.router.navigate(['/auth/verifyPass']);
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
          title: 'Signed in successfully',
        });

        if (this.srcImg) {
          const imageUrl = URL.createObjectURL(this.srcImg);
          this.authService.Img = imageUrl;
        }
      },
    });
  }

  confirmPassword(group: AbstractControl) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  }
  // -----------------------------------------------------------------------//
  // dropZone
  onSelect(event: any) {
    const selectedFile = event.addedFiles[0];
    if (selectedFile) {
      this.files = [selectedFile];
    }
    this.srcImg = this.files[0];
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }
}
