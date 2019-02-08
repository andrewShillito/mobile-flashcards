import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import SelectDeckModal from "./SelectDeckModal";

class Edit extends React.Component{
  render() {
    return (
      <View style={{flex: 1, justifyContent: "space-evenly", alignItems: "center"}}>
        <Text>Edit Route</Text>

      </View>
    );
  }
}

export default connect()(Edit);
