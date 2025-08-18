import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  imgProfile: string = '';
  userName: string = '';
  baseUrl = 'https://upskilling-egypt.com:3006/';

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.getImage();
  }

  getImage() {
    this.authService.getProfileData().subscribe({
      next: (res) => {
        this.imgProfile = this.baseUrl + res.imagePath;
        this.userName = res.userName;
      },
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth']);
  }
}
