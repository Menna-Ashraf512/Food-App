import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  imgProfile: string | null = '';
  userName: string = '';
  baseUrl = 'https://upskilling-egypt.com:3006/';

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    if (localStorage.getItem('userToken')) {
      this.getImage();
    }
  }

  getImage() {
    this.authService.getProfileData().subscribe({
      next: (res) => {
        this.imgProfile = res.imagePath
          ? this.baseUrl + res.imagePath
          : '../../../../../../assets/images/img-profile.jpg';
        this.userName = res.userName;
      },
      error: (err) => {
        console.error('API Error:', err);
      },
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth']);
  }
}
