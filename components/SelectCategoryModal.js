import React from "react";
import { Picker } from "react-native";
import ModalWrapperSecondary from "./ModalWrapperSecondary";
import styles from "../styles/selectCategoryModal";

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
      <ModalWrapperSecondary
        visible={this.props.visible}
        onRequestClose={this.props.onRequestClose}
        onPressOutside={this.props.onPressOutside}
        transparent={true}
      >
        <Picker
          selectedValue={this.props.selectedCategory}
          onValueChange={this.props.onValueChange}
          style={styles.picker}
          itemStyle={styles.text}
          >
          <Picker.Item label="Show All" value="all" key="all"/>
          {this.props.categories.length
            ? this.props.categories.map((name) => (
              <Picker.Item label={name} value={name} key={name} />
            ))
            : Object.keys(dummyCategories).map(cat => <Picker.Item label={cat} value={cat} key={cat} />)
          }
        </Picker>
      </ModalWrapperSecondary>
    );
  }
}
