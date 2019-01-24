import React from "react";
import { View, Stylesheet } from "react-native";
import { createAppContainer, createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from "react-navigation";
import { connect } from "react-redux";
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

HomeStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};

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

class Router extends React.Component {
  render() {
    return (
      <AppContainer screenProps={{activeDeck: this.props.activeDeck}} />
    );
  }
}

export default connect()(Router);
