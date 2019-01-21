import React from "react";
import { View, Text, TextInput } from "react-native";
import { connect } from "react-redux";
import SubmitBtn from "./SubmitBtn";
import { inputStyles } from "../styles";

class EditDeck extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: `Edit ${navigation.state.params.title}` // title passed from DeckDetail component via nagiation
    };
  }
  state = {
    title: this.props.navigation.state.params.title,
  }
  addCard = () => {
    this.props.navigation.navigate("AddCard");
  }
  onChange = ({ title }) => {
    this.setState(() => ({
      title,
    }));
  }
  render() {
    return (
      <View>
        <View style={inputStyles.inputContainer}>
          <TextInput
            style={inputStyles.input}
            placeholder="Deck Title"
            onChangeText={(title) => this.onChange({title})}
            value={this.state.title}
            />
        </View>
      </View>
    );
  }
}

export default connect()(EditDeck);
