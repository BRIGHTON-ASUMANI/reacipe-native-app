// types.ts
export type RootStackParamList = {
    Home: undefined;
    RecipeDetails: { recipe: Recipe };
    Profile: undefined;
    Login: undefined; 
  };
  
  export type Recipe = {
    id: number;
    image: string;
    title: string;
    description: string;
    ingredients: string[];
    steps: string[];
  };
  