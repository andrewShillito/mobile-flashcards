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

const DeckTabs = createBottomTabNavigator({
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => <MaterialCommunityIcons name='cards-outline' size={30} color={tintColor} />
    }
    },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      tabBarLabel: "Add Card",
      tabBarIcon: ({tintColor}) => <Entypo name="add-to-list" size={30} color={tintColor} />
    }
  },
  EditDeck: {
    screen: EditDeck,
    navigationOptions: {
      tabBarLabel: "Edit Deck",
      tabBarIcon: ({tintColor}) => <FontAwesome name="edit" size={30} color={tintColor} />
    }
    },
  },
  {
    initialRouteName: "DeckDetail",
  }
);

const MainStack = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      title: "Home",
      header: null,
    }
  },
  Deck: {
    screen: DeckTabs,
    navigationOptions: {
      title: "",
    }
  },
});

const AppContainer = createAppContainer(MainStack);

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
