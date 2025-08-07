import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes.component';


const routes: Routes = [
  { path: '', component: RecipesComponent }
];

@NgModule({
  declarations: [
    RecipesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class RecipesModule { }
