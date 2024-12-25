import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types';
import { supabase } from '@/supabase';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';
import { FoodThemeColors } from '../color';

type ProfileNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

type ProfileProps = {
  navigation: ProfileNavigationProp;
};

type ProfileOptionProps = {
  icon: string;
  title: string;
  subtitle?: string;
  onPress: () => void;
};

const ProfileOption: React.FC<ProfileOptionProps> = ({ icon, title, subtitle, onPress }) => (
  <TouchableOpacity style={styles.optionContainer} onPress={onPress}>
    <MaterialIcons name={icon as any} size={24} color={FoodThemeColors.primary.main} />
    <View style={styles.optionTextContainer}>
      <Text style={styles.optionTitle}>{title}</Text>
      {subtitle && <Text style={styles.optionSubtitle}>{subtitle}</Text>}
    </View>
    <MaterialIcons name="chevron-right" size={24} color={FoodThemeColors.neutral.light.text} />
  </TouchableOpacity>
);

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
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Animated.View 
          entering={FadeInUp.delay(100)}
          style={styles.headerContainer}
        >
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarEmoji}>👨‍🍳</Text>
          </View>
          <Text style={styles.username}>Chef John</Text>
          <Text style={styles.email}>john@example.com</Text>
        </Animated.View>

        <Animated.View 
          entering={FadeInUp.delay(200)}
          style={styles.statsContainer}
        >
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Recipes</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>48</Text>
            <Text style={styles.statLabel}>Favorites</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>156</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </Animated.View>

        <Animated.View 
          entering={FadeInUp.delay(300)}
          style={styles.sectionsContainer}
        >
          <Text style={styles.sectionTitle}>Account Settings</Text>
          <ProfileOption
            icon="person-outline"
            title="Edit Profile"
            subtitle="Update your profile information"
            onPress={() => {}}
          />
          <ProfileOption
            icon="notifications-none"
            title="Notifications"
            subtitle="Manage your notifications"
            onPress={() => {}}
          />
          <ProfileOption
            icon="restaurant-menu"
            title="Dietary Preferences"
            subtitle="Manage your food preferences"
            onPress={() => {}}
          />
          <ProfileOption
            icon="security"
            title="Privacy"
            subtitle="Manage your privacy settings"
            onPress={() => {}}
          />
        </Animated.View>

        <Animated.View 
          entering={FadeInUp.delay(400)}
          style={styles.logoutContainer}
        >
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={logout}
          >
            <MaterialIcons name="logout" size={20} color="white" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: FoodThemeColors.neutral.light.background,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  headerContainer: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: FoodThemeColors.neutral.light.card,
    borderBottomWidth: 1,
    borderBottomColor: FoodThemeColors.neutral.light.border,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: FoodThemeColors.primary.light,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarEmoji: {
    fontSize: 40,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: FoodThemeColors.neutral.light.text,
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: FoodThemeColors.neutral.light.text + '80',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: FoodThemeColors.neutral.light.border,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: FoodThemeColors.primary.main,
  },
  statLabel: {
    fontSize: 14,
    color: FoodThemeColors.neutral.light.text + '80',
    marginTop: 4,
  },
  sectionsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: FoodThemeColors.neutral.light.text,
    marginBottom: 16,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  optionTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: FoodThemeColors.neutral.light.text,
  },
  optionSubtitle: {
    fontSize: 14,
    color: FoodThemeColors.neutral.light.text + '80',
    marginTop: 2,
  },
  logoutContainer: {
    padding: 20,
  },
  logoutButton: {
    backgroundColor: FoodThemeColors.status.error,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Profile;