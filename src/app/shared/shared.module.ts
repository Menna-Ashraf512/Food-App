import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { NgxDropzoneModule } from 'ngx-dropzone';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    HttpClientModule,
    RouterLink,
  ],
  exports: [
    ReactiveFormsModule,
    HttpClientModule,
    NgxDropzoneModule,
    RouterLink,
  ],
})
export class SharedModule {}
