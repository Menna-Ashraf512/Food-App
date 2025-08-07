import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [NavbarComponent, SideBarComponent, HomeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    HttpClientModule,
    RouterLink,
    RouterLinkActive,
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
  ],
})
export class SharedModule {}
