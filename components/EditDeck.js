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
    title: '',
  }
  addCard = () => {
    this.props.navigation.navigate("AddCard");
  }
  onChange = ({ title }) => {
    this.setState(() => ({
      title,
    }));
  }
  changeTitle = (oldTitle, newTitle) => {
    // this.props.dispatch() // need to edit the store if I am going to change 
    // the deck title - need new actions and reducer changes
  }
  render() {
    return (
      <View>
        <View style={inputStyles.inputContainer}>
          <TextInput
            style={inputStyles.input}
            placeholder="New Title"
            onChangeText={(title) => this.onChange({title})}
            value={this.state.title}
            />
        </View>
        <SubmitBtn onPress={() => this.changeTitle(this.props.navigation.state.params.title, this.state.title)}>Submit</SubmitBtn>
      </View>
    );
  }
}

export default connect()(EditDeck);
