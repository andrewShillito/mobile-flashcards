import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import SelectDeckModal from "./SelectDeckModal";
import SubmitBtn from "./SubmitBtn";

class Edit extends React.Component{
  render() {
    return (
      <View style={{flex: 1, justifyContent: "space-evenly", alignItems: "center"}}>
        <Text>Edit Route</Text>
        <SelectDeckModal></SelectDeckModal>
      </View>
    );
  }
}

export default connect()(Edit);
