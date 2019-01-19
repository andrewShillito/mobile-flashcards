import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createStackNavigator, createBottomTabNavigator } from "react-navigation";
import { createStore } from "redux";
import reducer from "./reducers";
import middleware from "./middleware";
import { Provider } from "react-redux";
import CustomStatusBar from "./components/CustomStatusBar";
import Home from "./components/Home";
import New from "./components/New";
import Edit from "./components/Edit";
import { FontAwesome } from "@expo/vector-icons";
import DeckDetail from "./components/DeckDetail";

const Tabs = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: "Home",
      tabBarIcon: ({tintColor}) => <FontAwesome name="home" size={30} color={tintColor} />
    }
  },
  New: {
    screen: New,
    navigationOptions: {
      tabBarLabel: "New",
      tabBarIcon: ({tintColor}) => <FontAwesome name="plus-square" size={30} color={tintColor} />
    }
  },
})

const Stack = createStackNavigator({
  Home: {
    screen: Tabs,
  },
  Deck: {
    screen: DeckDetail,
  }
});

const AppContainer = createAppContainer(Stack);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer, middleware)}>
        <View style={styles.appContainer}>
          <CustomStatusBar backgroundColor="steelblue" barStyle="light-content" />
          <AppContainer />
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
