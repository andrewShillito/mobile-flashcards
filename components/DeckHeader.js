import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import styles from "../styles/deckHeader";

export default function DeckHeader({ children }) {
  return (
    <View>
      <Text style={styles.deckHeader}>{children}</Text>
    </View>
  );
}
