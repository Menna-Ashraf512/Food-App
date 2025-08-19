import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UsersService } from '../../service/users.service';
import { userData } from '../../interface/users';
import { environment } from 'src/app/core/environment/baseUrlImage';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss'],
})
export class ViewUsersComponent implements OnChanges {
  @Input() userId!: number;
  userData: userData | null = null;
  imgUser: string = '';
  baseUrl = environment.baseUrl;
  constructor(private usersService: UsersService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['userId'] && this.userId) {
      this.getItemById(this.userId);
    }
  }

  getItemById(id: number) {
    this.usersService.getUserById(id).subscribe({
      next: (res) => {
        this.userData = res;

        if (this.userData?.imagePath) {
          this.imgUser = this.baseUrl + this.userData.imagePath;
        } else {
          this.imgUser = 'assets/images/img-profile.jpg';
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
