// RecipeDetailsScreen.tsx
import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/types';

type RecipeDetailsScreenProps = {
  route: RouteProp<RootStackParamList, 'RecipeDetails'>;
};

const RecipeDetailsScreen: React.FC<RecipeDetailsScreenProps> = ({ route }) => {
  const { recipe } = route.params;

  return (
    <ScrollView className="flex-1 p-5 bg-gray-100">
      <Image source={{ uri: recipe.image }} className="h-64 rounded-lg" />
      <Text className="text-2xl font-bold mt-5">{recipe.title}</Text>
      <Text className="text-lg text-gray-500 mt-3">{recipe.description}</Text>

      <Text className="text-xl font-bold mt-5">Ingredients</Text>
      {recipe.ingredients.map((ingredient, index) => (
        <Text key={index} className="text-lg mt-1">
          • {ingredient}
        </Text>
      ))}

      <Text className="text-xl font-bold mt-5">Steps</Text>
      {recipe.steps.map((step, index) => (
        <Text key={index} className="text-lg mt-2">
          {index + 1}. {step}
        </Text>
      ))}
    </ScrollView>
  );
};

export default RecipeDetailsScreen;
