import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { deckStyles } from "../styles"

export default function DeckHeader({ children }) {
  return (
    <View>
      <Text style={deckStyles.deckHeader}>{children}</Text>
    </View>
  );
}
