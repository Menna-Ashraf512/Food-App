import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

interface IMenu {
  title: string;
  icon: string;
  menuLink: string;
  isActive: boolean;
}

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent {
  hovered: boolean = false;
  constructor(private router: Router) {}

  // --------------------------------------------------------//
  logout() {
    localStorage.clear();
    this.router.navigate(['/auth']);
  }

  isAdmin(): boolean {
    return localStorage.getItem('role') === 'SuperAdmin' ? true : false;
  }
  isUser(): boolean {
    return localStorage.getItem('role') === 'SystemUser' ? true : false;
  }
  //list
  menu: IMenu[] = [
    {
      title: 'Home',
      icon: 'fa-house',
      menuLink: '/dashboard/home',
      isActive: this.isAdmin() || this.isUser(),
    },
    {
      title: 'Users',
      icon: 'fa-users',
      menuLink: '/dashboard/admin/users',
      isActive: this.isAdmin(),
    },
    {
      title: 'Recipes',
      icon: 'fa-border-all',
      menuLink: '/dashboard/admin/recipes',
      isActive: this.isAdmin(),
    },
    {
      title: 'Categories',
      icon: 'fa-clipboard-list',
      menuLink: '/dashboard/admin/category',
      isActive: this.isAdmin(),
    },
    {
      title: 'Favorites',
      icon: 'fa-heart',
      menuLink: '/dashboard/home',
      isActive: this.isUser(),
    },
  ];
}
