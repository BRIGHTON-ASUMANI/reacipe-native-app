import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types'; 
import { supabase } from '@/supabase';

type ProfileNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

type ProfileProps = {
  navigation: ProfileNavigationProp;
};

const Profile: React.FC<ProfileProps> = ({ navigation }) => {
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error.message);
    } else {
      navigation.replace('Login'); 
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Profile</Text>
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: 'red',
          marginTop: 20,
          alignItems: 'center',
          borderRadius: 5,
        }}
        onPress={logout}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
