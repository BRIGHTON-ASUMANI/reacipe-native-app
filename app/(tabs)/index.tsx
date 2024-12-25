import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  TextInput,
  StyleSheet 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { supabase } from '@/supabase';
import EmptyRecipeList from '@/components/EmptyRecipeList';
import { Session } from '@supabase/supabase-js';

// Types
type Recipe = {
  id: number;
  image: string;
  title: string;
  description: string;
  preference: string;
};

type RootStackParamList = {
  Home: undefined;
  RecipeDetails: { recipe: Recipe };
  Auth: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [session, setSession] = useState<Session | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  useEffect(() => {
    fetchRecipes();
    checkSession();
  }, []);

  const checkSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setSession(session);
  };

  // Function to fetch recipes from Supabase
  const fetchRecipes = async () => {
    const { data, error } = await supabase
      .from('recipes')
      .select('*');

    if (error) {
      console.error('Error fetching recipes:', error.message);
    } else {
      setRecipes(data || []);
      setFilteredRecipes(data || []);
    }
  };

  // Search functionality with autocomplete
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    
    if (text.trim() === '') {
      setFilteredRecipes(recipes);
      setSuggestions([]);
      return;
    }

    // Generate suggestions based on titles
    const searchSuggestions = recipes
      .map(recipe => recipe.title)
      .filter(title => 
        title.toLowerCase().includes(text.toLowerCase())
      )
      .slice(0, 5); // Limit to 5 suggestions

    setSuggestions(searchSuggestions);

    // Filter recipes based on search
    const filtered = recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(text.toLowerCase()) ||
      recipe.description.toLowerCase().includes(text.toLowerCase()) ||
      recipe.preference.toLowerCase().includes(text.toLowerCase())
    );
    
    setFilteredRecipes(filtered);
  };

  // Handle favorites
  const toggleFavorite = async (recipeId: number) => {
    if (!session) {
      navigation.navigate('Auth');
      return;
    }

    // Implementation for adding/removing favorites
    const { data: existingFavorite } = await supabase
      .from('favorites')
      .select('*')
      .eq('user_id', session.user.id)
      .eq('recipe_id', recipeId)
      .single();

    if (existingFavorite) {
      await supabase
        .from('favorites')
        .delete()
        .eq('user_id', session.user.id)
        .eq('recipe_id', recipeId);
    } else {
      await supabase
        .from('favorites')
        .insert([
          { user_id: session.user.id, recipe_id: recipeId }
        ]);
    }
  };

  const renderRecipe = ({ item }: { item: Recipe }) => (
    <TouchableOpacity
      style={styles.recipeCard}
      onPress={() => navigation.navigate('RecipeDetails', { recipe: item })}
    >
      <Image 
        source={{ uri: item.image }} 
        style={styles.recipeImage}
      />
      <View style={styles.recipeInfo}>
        <Text style={styles.recipeTitle}>{item.title}</Text>
        <Text style={styles.recipeDescription}>{item.description}</Text>
        {session && (
          <TouchableOpacity 
            onPress={() => toggleFavorite(item.id)}
            style={styles.favoriteButton}
          >
            <Text>♥</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search recipes..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
        {suggestions.length > 0 && (
          <View style={styles.suggestionsContainer}>
            {suggestions.map((suggestion, index) => (
              <TouchableOpacity
                key={index}
                style={styles.suggestionItem}
                onPress={() => {
                  setSearchQuery(suggestion);
                  handleSearch(suggestion);
                  setSuggestions([]);
                }}
              >
                <Text>{suggestion}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
      
      <FlatList
        data={filteredRecipes}
        keyExtractor={item => item.id.toString()}
        renderItem={renderRecipe}
        ListEmptyComponent={EmptyRecipeList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    marginBottom: 16,
    zIndex: 1,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: 'white',
  },
  suggestionsContainer: {
    position: 'absolute',
    top: 45,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    maxHeight: 200,
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  recipeCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
  },
  recipeImage: {
    width: 100,
    height: 100,
  },
  recipeInfo: {
    flex: 1,
    padding: 12,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  recipeDescription: {
    fontSize: 14,
    color: '#666',
  },
  favoriteButton: {
    position: 'absolute',
    right: 12,
    top: 12,
    padding: 8,
  },
});

export default HomeScreen;