import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { NotFoundComponent } from '../shared/components/not-found/not-found.component';
import { HomeComponent } from '../shared/components/home/home.component';
import { adminGuard } from '../core/guards/admin.guard';
import { userGuard } from '../core/guards/user.guard';
import { MyProfileComponent } from '../shared/components/my-profile/my-profile.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, title: 'Home page' },
      { path: 'profile', component: MyProfileComponent, title: 'my Profile' },
      {
        path: 'user',
        canActivate: [userGuard],
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'admin',
        canActivate: [adminGuard],
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
      },
    ],
  },
  { path: '**', component: NotFoundComponent, title: 'NotFound Page' },
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class DashboardModule {}
