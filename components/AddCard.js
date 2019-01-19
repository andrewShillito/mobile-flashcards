import React from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import RouteTitle from "./RouteTitle";

class AddCard extends React.Component {
  render() {
    const title = this.props.navigation.state.params.title;
    return (
      <View>
        <RouteTitle>{`Add card to ${title}`}</RouteTitle>
      </View>
    );
  }
}



export default connect()(AddCard);
