import { Component, OnInit } from '@angular/core';
import { RecipesService } from './service/recipes.service';
import { IRecipe, RecipeData } from './interfaces/recipe';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit {
  listRecipe: RecipeData[] = [];
  recipeData!: IRecipe;
  pageSize!: number;
  pageNumber!: number;
  baseUrl = 'https://upskilling-egypt.com:3006/';

  constructor(private recipesService: RecipesService) {}
  ngOnInit(): void {
    this.getAllRecipes();
  }
  getAllRecipes() {
    this.recipesService.getAllRecipes().subscribe({
      next: (res) => {
        this.recipeData = res;
        this.listRecipe = res.data.map((recipe: any) => {
          return {
            ...recipe,
            imagePath: this.baseUrl + recipe.imagePath,
          };
        });
      },
    });
  }

  handlePageEvent(e: any) {
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex;
    this.getAllRecipes();
  }
}
