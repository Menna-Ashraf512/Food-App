import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { environment } from 'src/app/core/environment/baseUrlImage';
import { RecipeData } from 'src/app/dashboard/admin/recipes/interfaces/recipe';
import { RecipeUserService } from '../../../service/recipe-user.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss'],
})
export class RecipeDetailsComponent {
  @Input() itemId!: number;
  @Output() confirmAddFav = new EventEmitter<number>();
  recipeData: RecipeData | null = null;
  imgRecipe: string = '';
  baseUrl = environment.baseUrl;

  constructor(private recipeUserService: RecipeUserService) {}

  onConfirm() {
    this.confirmAddFav.emit(this.itemId);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['itemId'] && this.itemId) {
      this.getItemById(this.itemId);
    }
  }

  getItemById(id: number) {
    this.recipeUserService.getRecipeById(id).subscribe({
      next: (res) => {
        this.recipeData = res;
        this.imgRecipe = res.imagePath
          ? this.baseUrl + res.imagePath
          : 'assets/images/img-recipe.jpg';
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
