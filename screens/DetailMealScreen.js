import React, { useLayoutEffect, useCallback } from "react";
import { ScrollView, View, Text, StyleSheet, Image } from "react-native";
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";
import { MEALS } from "../data/dummy-data";
import Item from "../components/Item";
import useStore from "../store";

export default function DetailMealScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { mealId } = route.params;

  const addFavorite = useStore((state) => state.addFavorite);
  const removeFavorite = useStore((state) => state.removeFavorite);
  const getUserFavorites = useStore((state) => state.getUserFavorites);
  const favorites = getUserFavorites();
  const isFavorite = favorites.some((meal) => meal.id === mealId);
  const selectedMeal = MEALS.find((meal) => meal.id === mealId);
  const isStarFilled = useStore((state) => state.isStarFilled);
  const toggleStarIcon = useStore((state) => state.toggleStarIcon);

  const toggleFavorite = useCallback(() => {
    toggleStarIcon();
    // toast show

    if (isFavorite) {
      removeFavorite(mealId);
    } else {
      addFavorite(selectedMeal);
    }
  }, [isFavorite, mealId, selectedMeal, addFavorite, removeFavorite,toggleStarIcon]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: selectedMeal.title,
      headerRight: () => (
        <Item
          iconName={isStarFilled ? "star" : "star-outline"}
          color={isStarFilled ? "yellow" : "#fff"}
          onPress={toggleFavorite}
        />
      ),
    });
  }, [navigation, selectedMeal.title, isFavorite, toggleFavorite]);
  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <Text>{selectedMeal.duration}m</Text>
        <Text>{selectedMeal.complexity.toUpperCase()}</Text>
        <Text>{selectedMeal.affordability.toUpperCase()}</Text>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectedMeal.ingredients.map((ingredient) => (
        <Text key={ingredient} style={styles.listItem}>
          {ingredient}
        </Text>
      ))}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map((step, index) => (
        <Text key={index} style={styles.listItem}>
          {index + 1}. {step}
        </Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  details: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    textAlign: "center",
    margin: 10,
  },
  listItem: {
    marginVertical: 5,
    marginHorizontal: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
  },
});
