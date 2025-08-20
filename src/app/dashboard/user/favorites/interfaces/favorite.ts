import { RecipeData } from 'src/app/dashboard/admin/recipes/interfaces/recipe';

export interface IFavorite {
  pageNumber: number;
  pageSize: number;
  data: FavoriteData[];
  totalNumberOfRecords: number;
  totalNumberOfPages: number;
}

export interface FavoriteData {
  id: number;
  creationDate: string;
  modificationDate: string;
  recipe: RecipeData;
}
