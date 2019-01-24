import React from "react";
import { View, Text } from "react-native";
import SubmitBtn from "./SubmitBtn";
import { connect } from "react-redux";

class ScoreDetails extends React.Component {
  render() {
    return (
      <View>
        <Text>Score Details Route</Text>
      </View>
    );
  }
}

function mapStateToProps({ }) {
  return;
}

export default connect()(ScoreDetails);
