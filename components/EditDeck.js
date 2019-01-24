import React from "react";
import { View, Text, TextInput } from "react-native";
import { connect } from "react-redux";
import SubmitBtn from "./SubmitBtn";
import { inputStyles } from "../styles";
import { handleEditTitle } from "../actions/decks";

class EditDeck extends React.Component {
  static navigationOptions = ({ screenProps }) => {
    return {
      title: `Edit ${screenProps.activeDeck}`,
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
  editTitle = (oldTitle, newTitle) => {
    this.props.dispatch(handleEditTitle(oldTitle, newTitle));
    this.setState(() => ({
      title: "",
    }));
    this.props.navigation.navigate("DeckDetail");
  }
  render() {
    const { activeDeck } = this.props;

    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <View style={[inputStyles.inputContainer, {marginBottom: 40}]}>
          <TextInput
            style={inputStyles.input}
            placeholder="New Title"
            onChangeText={(title) => this.onChange({title})}
            value={this.state.title}
            />
        </View>
        <SubmitBtn onPress={() => this.editTitle(this.props.activeDeck, this.state.title)}>Submit</SubmitBtn>
      </View>
    );
  }
}

function mapStateToProps({ activeDeck }) {
  return {
    activeDeck,
  }
}

export default connect(mapStateToProps)(EditDeck);
