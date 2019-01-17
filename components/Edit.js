import React from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";

class Edit extends React.Component {
  render() {
    return (
      <View>
        <Text>Edit Route</Text>
      </View>
    );
  }
}

export default connect()(Edit);
