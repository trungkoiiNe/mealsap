import React from 'react';
import { View, StyleSheet } from 'react-native';
import HeaderButton from './HeaderButton';

const Item = ({ iconName, color, onPress }) => {
  return (
    <View style={styles.headerItem}>
      <HeaderButton
        iconName={iconName}
        color={color}
        onPress={onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerItem: {
    marginHorizontal: 5,
  },
});

export default Item;