import React from 'react';
import { Text, View, TextInput } from 'react-native';
import SubmitBtn from "./SubmitBtn";
import { newStyles as styles } from "../styles";

class New extends React.Component {
  state = {
    title: ""
  }
  onPress = () => {
    console.log("pressed")
  }
  onChange = ({ title }) => {
    this.setState(() => ({
      title,
    }));
  }
  render() {
    return (
      <View style={styles.new}>
        <Text style={styles.text}>New Route</Text>
        <View>
          <TextInput
            style={styles.text}
            placeholder="Deck Title"
            onChangeText={(title) => this.onChange({title})}
            />
        </View>
        <SubmitBtn onPress={this.onPress}>Submit</SubmitBtn>
      </View>
    );
  }
}

export default New;
