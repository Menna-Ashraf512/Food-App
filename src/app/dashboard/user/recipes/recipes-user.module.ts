import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes-user.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  { path: '', redirectTo: 'recipeList', pathMatch: 'full' },
  { path: 'recipeList', component: RecipesComponent },
];

@NgModule({
  declarations: [RecipeDetailsComponent, RecipesComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class RecipesModule {}
