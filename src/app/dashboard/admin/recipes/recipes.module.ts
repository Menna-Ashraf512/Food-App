import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditAddRecipesComponent } from './components/edit-add-recipes/edit-add-recipes.component';

const routes: Routes = [
  { path: '', component: RecipesComponent },
  { path: 'add', component: EditAddRecipesComponent, title: 'Add Recipe' },
  {
    path: 'edit/:id',
    component: EditAddRecipesComponent,
    title: 'Edit Recipe',
  },
  {
    path: 'view/:id',
    component: EditAddRecipesComponent,
    title: 'View Recipe',
  },
];

@NgModule({
  declarations: [RecipesComponent, EditAddRecipesComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class RecipesModule {}
