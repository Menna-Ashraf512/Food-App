import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewUsersComponent } from './components/view-users/view-users.component';

const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: UsersComponent },
];

@NgModule({
  declarations: [UsersComponent, ViewUsersComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class UsersModule {}
