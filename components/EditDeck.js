import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import SubmitBtn from "./SubmitBtn";
import { inputStyles } from "../styles";
import { handleEditTitle, handleRemoveDeck } from "../actions/decks";
import EditCards from "./EditCards";

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
  deleteDeck = () => {
    this.props.dispatch(handleRemoveDeck(this.props.activeDeck));
    this.clearInput();
    this.props.navigation.navigate("Home");
  }
  clearInput = () => {
    this.setState(() => ({
      title: "",
    }))
  }
  render() {
    const { activeDeck } = this.props;

    return (
      <View style={{flex: 1, justifyContent: "space-evenly", alignItems: "center"}}>
        <View style={{flex: 1, justifyContent: "space-evenly", alignItems: "center"}}>
          <View>
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
          <TouchableOpacity onPress={this.deleteDeck} style={{marginTop: 40}}>
            <Text style={{color: "#dc3545", fontSize: 20}}>Delete Deck</Text>
          </TouchableOpacity>
        </View>
        <EditCards style={{flex: 1}}/>
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
