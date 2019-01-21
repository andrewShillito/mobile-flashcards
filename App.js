import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from "react-navigation";
import { createStore } from "redux";
import reducer from "./reducers";
import middleware from "./middleware";
import { Provider } from "react-redux";
import CustomStatusBar from "./components/CustomStatusBar";
import Home from "./components/Home";
import New from "./components/New";
import EditDeck from "./components/EditDeck";
import { FontAwesome, MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import DeckDetail from "./components/DeckDetail";
import AddCard from "./components/AddCard";

const HomeStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      header: null,
      title: "Home",
    }
  },
  DeckDetail: {
    screen: DeckDetail, //set header title dynamically to be deck title
    },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: "Add Card",
    }
  },
  EditDeck: {
    screen: EditDeck, //header title is dynamically set via nav params deckDetail -> editDeck
  }
});

const Tabs = createBottomTabNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: {
      tabBarLabel: "Home",
      tabBarIcon: ({tintColor}) => <FontAwesome name="home" size={30} color={tintColor} />,
    }
  },
  New: {
     screen: New,
     navigationOptions: {
       tabBarLabel: "New",
       tabBarIcon: ({tintColor}) => <FontAwesome name="plus-square" size={30} color={tintColor} />
     }
   },
});

const AppContainer = createAppContainer(Tabs);

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
