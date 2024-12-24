import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Preference = () => {
  const [preference, setPreference] = useState('vegetarian');

  const updatePreference = async () => {
    // Save preference to Supabase
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Choose Your Preferences</Text>
      <TouchableOpacity
        style={{ padding: 10, backgroundColor: preference === 'vegetarian' ? 'green' : 'gray', marginTop: 20 }}
        onPress={() => setPreference('vegetarian')}
      >
        <Text style={{ color: 'white' }}>Vegetarian</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ padding: 10, backgroundColor: preference === 'non-vegetarian' ? 'green' : 'gray', marginTop: 20 }}
        onPress={() => setPreference('non-vegetarian')}
      >
        <Text style={{ color: 'white' }}>Non-Vegetarian</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ padding: 10, backgroundColor: 'blue', marginTop: 20 }} onPress={updatePreference}>
        <Text style={{ color: 'white' }}>Save Preferences</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Preference;
