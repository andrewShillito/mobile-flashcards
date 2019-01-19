import React from "react";
import { View, Text, TextInput } from "react-native";
import { newStyles as styles } from "../styles";

function RouteTitle({ children }) {
  return (
    <View>
      <Text style={{fontSize: 40, alignSelf: "center"}}>{children}</Text>
    </View>
  );
}

export default RouteTitle;
