import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../styles/submitBtn";

function SubmitBtn({ onPress, children, type, additionalStyling }) {
  if (type === undefined) {
    type = "submitBtn";
  }
  if (additionalStyling !== undefined) {
    return (
      <TouchableOpacity style={[styles[type], additionalStyling, {alignSelf: "center"}]} onPress={onPress}>
        <Text style={styles[`${type}Text`]}>{children}</Text>
      </TouchableOpacity>
    );
  }
  return (
     <TouchableOpacity style={[styles[type], {alignSelf: "center"}]} onPress={onPress}>
       <Text style={styles[`${type}Text`]}>{children}</Text>
     </TouchableOpacity>
   );
}

export default SubmitBtn;
