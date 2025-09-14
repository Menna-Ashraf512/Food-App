import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  userName: string = '';
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.getImage();
  }

  isAdmin = localStorage.getItem('role') === 'SuperAdmin' ? true : false;

  getImage() {
    this.authService.getProfileData().subscribe({
      next: (res) => {
        this.userName = res.userName;
      },
    });
  }
}
