import React from "react";
import { Picker } from "react-native";
import ModalWrapperSecondary from "./ModalWrapperSecondary";
import styles from "../styles/selectCategoryModal";
import { connect } from "react-redux";

class SelectCategoryModal extends React.Component {
  render() {
    const { categories } = this.props;
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
          <Picker.Item label="Show All" value="Show All" key="Show All"/>
          {categories.length
            ? categories.map((name) => (
              <Picker.Item label={name} value={name} key={name} />
            ))
            : null
          }
        </Picker>
      </ModalWrapperSecondary>
    );
  }
}

function mapStateToProps({ categories }, parentProps) {
  // console.log("Categories Obj", categories);
  // console.log("Categories Arr", Object.keys(categories));
  return {
    ...parentProps,
    categories: Object.keys(categories)
  }
}

export default connect(mapStateToProps)(SelectCategoryModal);
