import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { HomeComponent } from './components/home/home.component';
import { DeleteItemComponent } from './components/delete-item/delete-item.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ChangePassComponent } from './components/change-pass/change-pass.component';
import { ViewComponent } from '../dashboard/admin/category/components/view/view.component';

@NgModule({
  declarations: [
    NavbarComponent,
    SideBarComponent,
    HomeComponent,
    DeleteItemComponent,
    ChangePassComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    HttpClientModule,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    MatPaginatorModule,
  ],
  exports: [
    DeleteItemComponent,
    NavbarComponent,
    SideBarComponent,
    HomeComponent,
    ReactiveFormsModule,
    HttpClientModule,
    NgxDropzoneModule,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    MatPaginatorModule,
  ],
})
export class SharedModule {}
