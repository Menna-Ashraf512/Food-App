export interface IRecipe {
  pageNumber: number;
  pageSize: number;
  data: RecipeData[];
  totalNumberOfRecords: number;
  totalNumberOfPages: number;
}

export interface RecipeData {
  id: number;
  name: string;
  imagePath: string;
  description: string;
  price: number;
  creationDate: string;
  modificationDate: string;
  category: any[];
  tag: Tag;
}

export interface Tag {
  id: number;
  name: string;
  creationDate: string;
  modificationDate: string;
}
