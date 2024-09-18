import React, { useLayoutEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Item from '../components/Item';
import MealItem from '../components/MealItem';
import { MEALS } from '../data/dummy-data';
import useStore from '../store';
export default function MealDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { categoryId, categoryName } = route.params;


  const displayedMeals = MEALS.filter(
    meal => meal.categoryIds.indexOf(categoryId) >= 0
  );

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <Item
  //         iconName="star"
  //         color="#fff"
  //         onPress={() => {
  //           console.log('Mark as favorite!');
  //         }}
  //       />
  //     ),
  //   });
  // }, [navigation]);
  const renderSeparator = () => (
    <View style={styles.separator} />
  );
  const renderMealItem = (itemData) => {
    return (
      <MealItem
        title={itemData.item.title}
        image={itemData.item.imageUrl}
        duration={itemData.item.duration}
        complexity={itemData.item.complexity}
        affordability={itemData.item.affordability}
        onSelectMeal={() => {
          navigation.navigate('DetailMeal', {
            mealId: itemData.item.id
          });
        }}
      />
    );
  };

  return (
    <View style={styles.screen}>
      <FlatList
        data={displayedMeals}
        renderItem={renderMealItem}
        style={{ width: '100%' }}
        ItemSeparatorComponent={renderSeparator}  // Add this line
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#ccc',
  },
});