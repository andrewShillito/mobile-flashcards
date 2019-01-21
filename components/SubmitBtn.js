import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { buttonStyles as styles } from "../styles";

function SubmitBtn({ onPress, children, type }) {
  if (type === undefined) {
    type = "submitBtn";
  }
  return (
     <TouchableOpacity style={styles[type]} onPress={onPress}>
       <Text style={styles.text}>{children}</Text>
     </TouchableOpacity>
   );
}

export default SubmitBtn;
