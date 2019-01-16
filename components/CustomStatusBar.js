import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Constants } from "expo";

function CustomStatusBar({backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

export default customStatusBar;
