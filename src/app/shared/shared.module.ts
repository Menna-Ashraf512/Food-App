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

@NgModule({
  declarations: [
    NavbarComponent,
    SideBarComponent,
    HomeComponent,
    DeleteItemComponent,
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
