import React from "react";
import { View, Text } from "react-native";
import SubmitBtn from "./SubmitBtn";
import { connect } from "react-redux";

class ScoreDetails extends React.Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Text style={{fontSize: 30}}>Coming Soon!</Text>
      </View>
    );
  }
}

function mapStateToProps({ }) {
  return;
}

export default connect()(ScoreDetails);
