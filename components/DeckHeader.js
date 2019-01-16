import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default DeckHeader({ name }) {
  return (
    <View>
      <Text>{name}</Text>
    </View>
  );
}
