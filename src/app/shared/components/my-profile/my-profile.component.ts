import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/app/core/environment/baseUrlImage';
import { CurrentProfileService } from 'src/app/shared/services/current-profile.service';
import { userData } from 'src/app/dashboard/admin/interfaces/users';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {
  userData!: userData;
  isHide: boolean = false;
  srcImg: any;
  previewImg!: string;
  files: File[] = [];
  originalImg: string = 'assets/images/img-profile.jpg';
  role!: any;

  basUrl = environment.baseUrl;
  constructor(private currentProfileService: CurrentProfileService) {}
  profileForm = new FormGroup({
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
    confirmPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{1,10}$/),
    ]),
  });

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.currentProfileService.getCurrentUser().subscribe({
      next: (res) => {
        this.userData = res;
        this.role = this.userData.group.name;
        if (this.role === 'SuperAdmin') {
          this.role = 'Admin';
        } else {
          this.role = 'User';
        }
        this.originalImg = res.imagePath
          ? this.basUrl + res.imagePath
          : 'assets/images/img-profile.jpg';
        this.previewImg = this.originalImg;
        this.profileForm.patchValue({
          userName: res.userName,
          email: res.email,
          phoneNumber: res.phoneNumber,
          country: res.country,
        });
      },
    });
  }

  editProfile(data: FormGroup) {
    let myData = new FormData();
    let formValues: any = this.profileForm.getRawValue();

    for (let key in formValues) {
      myData.append(key, String(formValues[key]));
    }
    if (this.srcImg) {
      myData.append('profileImage', this.srcImg);
    }

    this.currentProfileService.editCurrentUser(myData).subscribe({
      next: (res) => {
        this.getData();
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
        this.profileForm.reset();
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
          title: 'Save Change successfully',
        });
      },
    });
  }

  // -----------------------------------------------------------------------//
  // dropZone
  onSelect(event: any) {
    const selectedFile = event.addedFiles[0];
    if (selectedFile) {
      this.files = [selectedFile];
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImg = reader.result as string;
      };
      reader.readAsDataURL(selectedFile);
    }
    this.srcImg = this.files[0];
  }
  onRemove(event?: any) {
    this.files = [];
    this.srcImg = null;
    this.previewImg = this.originalImg;
  }
}
