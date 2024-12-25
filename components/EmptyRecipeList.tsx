import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useEffect } from 'react';
import Animated, { 
  useAnimatedStyle, 
  withRepeat, 
  withSequence, 
  withSpring,
  useSharedValue,
  withDelay
} from 'react-native-reanimated';

const EmptyRecipeList = () => {
  const bounceValue = useSharedValue(0);
  const opacityValue = useSharedValue(0);
  
  useEffect(() => {
    bounceValue.value = withRepeat(
      withSequence(
        withSpring(1, { damping: 2 }),
        withSpring(0, { damping: 2 })
      ),
      -1,
      true
    );
    
    opacityValue.value = withDelay(
      500,
      withSpring(1, { damping: 20 })
    );
  }, []);

  const bounceStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bounceValue.value * 15 }],
  }));

  const fadeStyle = useAnimatedStyle(() => ({
    opacity: opacityValue.value,
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[bounceStyle, styles.emojiContainer]}>
        <View style={styles.emojiCircle}>
          <Text style={styles.emoji}>👨‍🍳</Text>
        </View>
      </Animated.View>
      
      <Animated.View style={[fadeStyle, styles.contentContainer]}>
        <Text style={styles.title}>No Recipes Found</Text>
        <Text style={styles.subtitle}>
          We couldn't find any recipes matching your preferences. Time to get creative in the kitchen! 🌟
        </Text>
        
        <View style={styles.iconRow}>
          <View style={[styles.iconCircle, styles.greenBg]}>
            <Text style={styles.foodEmoji}>🥗</Text>
          </View>
          <View style={[styles.iconCircle, styles.yellowBg]}>
            <Text style={styles.foodEmoji}>🌱</Text>
          </View>
          <View style={[styles.iconCircle, styles.orangeBg]}>
            <Text style={styles.foodEmoji}>🥘</Text>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 400,
    paddingVertical: 40,
  },
  emojiContainer: {
    marginBottom: 32,
  },
  emojiCircle: {
    width: 112,
    height: 112,
    backgroundColor: '#FFF5E6',
    borderRadius: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 48,
  },
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  iconCircle: {
    padding: 12,
    borderRadius: 24,
    marginHorizontal: 4,
  },
  greenBg: {
    backgroundColor: '#DCFCE7',
  },
  yellowBg: {
    backgroundColor: '#FEF9C3',
  },
  orangeBg: {
    backgroundColor: '#FFEDD5',
  },
  foodEmoji: {
    fontSize: 24,
  },
});

export default EmptyRecipeList;