import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function DeckHeader({ children }) {
  return (
    <View>
      <Text>{children}</Text>
    </View>
  );
}
