import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HeaderButton = ({ onPress, iconName, color }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.headerButton}>
      <Ionicons name={iconName} size={23} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  headerButton: {
    marginHorizontal: 10,
  },
});

export default HeaderButton;