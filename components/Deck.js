import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

function Deck(props) {
  return (
    <View>
      <TouchableOpacity>
        <Text>{props.name}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Deck;
