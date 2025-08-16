import { Component, Input, SimpleChanges } from '@angular/core';
import { UsersService } from '../../service/users.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { userData } from '../../interface/users';
import { environment } from 'src/app/core/environment/baseUrlImage';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss'],
})
export class ViewUsersComponent {
  @Input() userId!: number;
  userData: userData | null = null;
  imgUer: string = '';
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
        this.imgUer = this.baseUrl + this.userData?.imagePath;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
