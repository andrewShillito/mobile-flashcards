import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SubmitBtn from "./SubmitBtn";

class New extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Text>New Route</Text>
        <SubmitBtn>Submit</SubmitBtn>
      </View>
    );
  }
}

export default New;
