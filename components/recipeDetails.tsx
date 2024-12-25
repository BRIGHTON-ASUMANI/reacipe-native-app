import { View, Text, ScrollView, Image } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/types'; // Importing RootStackParamList type

// Define the Recipe type
type Recipe = {
  title: string;
  description: string;
  image: string;
  ingredients: string[];
  steps: string[];
};

// Define the RecipeDetailsProps type that includes route as a prop
type RecipeDetailsProps = {
  route: RouteProp<RootStackParamList, 'RecipeDetails'>;
};

// The RecipeDetails component
const RecipeDetails: React.FC<RecipeDetailsProps> = ({ route }) => {
  // Add defensive check for route.params
  if (!route.params) {
    return (
      <ScrollView className="flex-1 p-5 bg-gray-100">
        <Text className='color-red'>No recipe found</Text>
      </ScrollView>
  )}

  const { recipe }: { recipe: Recipe } = route.params; // Extract the recipe from params

  return (
    <ScrollView className="flex-1 p-5 bg-gray-100">
      {/* Image */}
      <Image source={{ uri: recipe.image }} className="h-64 rounded-lg" />
      
      {/* Title */}
      <Text className="text-2xl font-bold mt-5">{recipe.title}</Text>

      {/* Description */}
      <Text className="text-lg text-gray-500 mt-3">{recipe.description}</Text>

      {/* Ingredients Section */}
      <Text className="text-xl font-bold mt-5">Ingredients</Text>
      {recipe.ingredients.map((ingredient, index) => (
        <Text key={index} className="text-lg mt-1">
          • {ingredient}
        </Text>
      ))}

      {/* Steps Section */}
      <Text className="text-xl font-bold mt-5">Steps</Text>
      {recipe.steps.map((step, index) => (
        <Text key={index} className="text-lg mt-2">
          {index + 1}. {step}
        </Text>
      ))}
    </ScrollView>
  );
};

export default RecipeDetails;
