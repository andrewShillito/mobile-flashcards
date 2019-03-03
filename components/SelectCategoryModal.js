import React from "react";
import { Picker } from "react-native";
import ModalWrapperPrimary from "./ModalWrapperPrimary";
import ButtonPrimary from "./ButtonPrimary";

export default class SelectCategoryModal extends React.Component {
  render() {
    const dummyCategories = {
      programming: {
        name: "programming"
      },
      other: {
        name: "other",
      },
    }
    return (
      <ModalWrapperPrimary
        visible={this.props.visible}
        onRequestClose={this.props.onRequestClose}
        onPressOutside={this.props.onPressOutside}
      >
        <Picker
          selectedValue={this.props.selectedCategory}
          onValueChange={this.props.onValueChange}
          >
          <Picker.Item label="Show All" value="all" key="all"/>
          {Object.keys(dummyCategories).map((name) => (
            <Picker.Item label={name} value={name} key={name}/>
          ))}
        </Picker>
        <ButtonPrimary
          onPress={this.props.onPress}
        >Submit
        </ButtonPrimary>
      </ModalWrapperPrimary>
    );
  }
}
