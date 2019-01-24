import React from 'react';
import { View } from 'react-native';
import { createAppContainer, createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from "react-navigation";
import { createStore } from "redux";
import reducer from "./reducers";
import middleware from "./middleware";
import { Provider } from "react-redux";
import CustomStatusBar from "./components/CustomStatusBar";
import Router from "./Router";

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer, middleware)}>
        <View style={styles.appContainer}>
          <CustomStatusBar backgroundColor="steelblue" barStyle="light-content" />
          <Router />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});
