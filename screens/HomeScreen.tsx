import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Navigation hook
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { supabase } from '../supabase'; // Make sure the supabase client is correctly typed

// Define type for a recipe
type Recipe = {
  id: number;
  image: string;
  title: string;
  description: string;
  preference: string;
};

// Define type for navigation stack
type RootStackParamList = {
  Home: undefined;
  RecipeDetails: { recipe: Recipe }; // Define the params for RecipeDetails
};

// Define type for navigation prop for HomeScreen
type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

const HomeScreen: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const navigation = useNavigation<HomeScreenNavigationProp>(); // Correctly typed navigation hook

  useEffect(() => {
    fetchRecipes();
  }, []);

  // Function to fetch recipes from Supabase
  const fetchRecipes = async () => {
    const { data, error } = await supabase
      .from('recipes') 
      .select('*')
      .eq('preference', 'vegetarian'); // Example preference

    if (error) {
      console.error('Error fetching recipes:', error.message);
    } else {
      setRecipes(data || []);  // Ensure data is either set to fetched data or an empty array
    }
  };

  // Render each recipe item
  const renderRecipe = ({ item }: { item: Recipe }) => (
    <TouchableOpacity
      className="p-3 mb-3 bg-white rounded-lg"
      onPress={() => navigation.navigate('RecipeDetails', { recipe: item })}
    >
      <Image source={{ uri: item.image }} className="h-40 rounded-lg" />
      <Text className="text-lg font-bold mt-2">{item.title}</Text>
      <Text className="text-gray-500 mt-1">{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 p-5 bg-gray-100">
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderRecipe}
        ListEmptyComponent={<Text className="text-center text-gray-500">No recipes found</Text>}
      />
    </View>
  );
};

export default HomeScreen;
