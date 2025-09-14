import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditAddCategoryComponent } from './components/edit-add-category/edit-add-category.component';
import { ViewComponent } from './components/view-category/view-category.component';

const routes: Routes = [{ path: '', component: CategoryComponent }];

@NgModule({
  declarations: [CategoryComponent, EditAddCategoryComponent, ViewComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class CategoryModule {}
