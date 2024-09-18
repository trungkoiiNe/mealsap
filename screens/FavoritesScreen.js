import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import useStore from "../store";

const FavoritesScreen = () => {
  const navigation = useNavigation();
  const getUserFavorites = useStore((state) => state.getUserFavorites);
  const favorites = useStore((state) => getUserFavorites());
  useFocusEffect(
    React.useCallback(() => {
      return () => {};
    }, [])
  );
  const handleMealPress = (mealId) => {
    navigation.navigate("DetailMeal", { mealId });
  };

  const renderMealItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleMealPress(item.id)}>
      <View style={styles.mealItem}>
        <Image source={{ uri: item.imageUrl }} style={styles.mealImage} />
        <Text style={styles.mealTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Favorite Meals</Text>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={renderMealItem}
        />
      ) : (
        <Text style={styles.emptyMessage}>
          You haven't added any favorites yet.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  mealItem: {
    backgroundColor: "#f0f0f0",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
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
  emptyMessage: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});

export default FavoritesScreen;
