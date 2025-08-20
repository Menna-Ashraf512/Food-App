import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: 'favorites',
    loadChildren: () =>
      import('./favorites/favorites.module').then((m) => m.FavoritesModule),
  },
  {
    path: 'recipes',
    loadChildren: () =>
      import('./recipes/recipes-user.module').then((m) => m.RecipesModule),
  },
];

@NgModule({
  declarations: [UserComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class UserModule {}
