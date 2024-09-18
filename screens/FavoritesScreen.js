import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useStore from '../store';

const FavoritesScreen = () => {
  const favorites = useStore((state) => state.favorites);
  const navigation = useNavigation();

  const handleMealPress = (mealId) => {
    navigation.navigate('DetailMeal', { mealId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Favorite Meals</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleMealPress(item.id)}>
            <View style={styles.mealItem}>
              <Image source={{ uri: item.imageUrl }} style={styles.mealImage} />
              <Text style={styles.mealTitle}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

// ... styles remain the same

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  mealItem: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  mealImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  mealTitle: {
    fontSize: 18,
    flex: 1,
  },
});

export default FavoritesScreen;
