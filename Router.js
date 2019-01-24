import React from "react";
import { View } from "react-native";
import { createAppContainer, createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from "react-navigation";
import { connect } from "react-redux";
import Home from "./components/Home";
import New from "./components/New";
import EditDeck from "./components/EditDeck";
import { FontAwesome, MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import DeckDetail from "./components/DeckDetail";
import AddCard from "./components/AddCard";
import Quiz from "./components/Quiz";

const HomeStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      header: null,
      title: "Home",
    }
  },
  DeckDetail: {
    screen: DeckDetail, //header title set dynamically to be deck title
    },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: "Add Card",
    }
  },
  EditDeck: {
    screen: EditDeck, //header title is dynamically set via nav screenProps (originate in redux store)
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: "Quiz" //maybe dynamically show progress ie: Question 1 of 2 , Q 3 of 10
    }
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

function mapStateToProps({ activeDeck }) {
  return {
    activeDeck,
  };
}

export default connect(mapStateToProps)(Router);
