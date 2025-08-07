import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  imgProfile: any;
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.getImage();
  }
  getImage() {
    this.authService.getProfileImage().subscribe({
      next: (res) => {
        this.imgProfile = res.imagePath;
        console.log(this.imgProfile);
      },
    });
  }
}
