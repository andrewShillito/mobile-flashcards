import React from "react";
import { View, Text, Modal, TouchableOpacity, FlatList } from "react-native";
import SubmitBtn from "./SubmitBtn";
import { buttonStyles } from "../styles";
import { FontAwesome } from "@expo/vector-icons";
import { connect } from "react-redux";

class SelectDeckModal extends React.Component{
  state = {
    modalVisible: false,
    selectedDeck: null,
  }
  setModalVisibility(visible) {
    this.setState(() => ({
      modalVisible: visible,
    }));
  }
  renderItem({ item }) {
    return (
      <View>
        <TouchableOpacity onPress={() => this.setDeck(item.title)}>
          <Text style={{color: "white"}}>{item.title}</Text>
          <Text>does this work?</Text>
        </TouchableOpacity>
      </View>
    );
  }
  setDeck(title) {
    this.setState(() => ({
      selectedDeck: title,
    }));
    this.setModalVisibility(false);
  }
  render() {
    const { decks } = this.props;

    return (
      <View>
        <Modal
          visible={this.state.modalVisible}
          onRequestClose={() => alert("Modal closed")}
          animationType="slide"
          transparent={true}
          >
          <View style={{marginTop: 22, marginHorizontal: 22, backgroundColor: "gray", alignSelf: "center", width: 300, height: 300,}}>
            <TouchableOpacity
              onPress={() => this.setModalVisibility(false)}
              style={{alignSelf: "flex-end", justifyContent: "flex-start"}}
              >
              <FontAwesome name="close" size={30} color="red" />
            </TouchableOpacity>
            <FlatList
              data={decks}
              renderItem={this.renderItem}
              keyExtractor={(item) => item.title}
              />
          </View>
        </Modal>
        <TouchableOpacity style={buttonStyles.textButton} onPress={() => this.setModalVisibility(true)}>
          <Text style={buttonStyles.textButtonText}>Show Modal</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps({ decks }) {
  return { //returning array
    decks: Object.keys(decks).map(title => {
      return decks[title];
    })
  };
}

export default connect(mapStateToProps)(SelectDeckModal);
