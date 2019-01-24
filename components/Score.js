import React from "react";
import { View, Text } from "react-native";
import SubmitBtn from "./SubmitBtn";
import { connect } from "react-redux";

class Score extends React.Component {
  render() {
    return (
      <View>
        <Text></Text>
      </View>
    );
  }
}

function mapStateToProps({ }) {
  return;
}

export default connect()(Score);
