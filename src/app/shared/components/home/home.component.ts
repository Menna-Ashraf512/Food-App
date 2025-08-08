import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/auth/services/auth.service';

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

  getImage() {
    this.authService.getProfileImage().subscribe({
      next: (res) => {
        this.userName = res.userName;
      },
    });
  }
}
