import React from 'react';
import { View, TextInput } from 'react-native';
import styles from "../styles/textInputPrimary";
import { MAX_SHORT_INPUT_LENGTH, BLUE, BLACK, PINK } from "../styles/shared";

export default class TextInputPrimary extends React.Component {
  state = {
    borderColor: BLACK,
  }
  toggleColor = () => {
    // this._textInput.setNativeProps({style: {borderBottomColor: PINK}})
    // console.log((this._textInput.setNativeProps).toSource());
    // console.log(this._textInput._inputRef.viewConfig.validAttributes.style.borderBottomColor.process(PINK));
  }
  render() {
    const { onChangeText, value, placeholder } = this.props;
    const { borderColor } = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          ref={(component) => this._textInput = component}
          style={styles.input}
          placeholder={placeholder}
          onChangeText={(title) => onChangeText(title)}
          value={value}
          maxLength={MAX_SHORT_INPUT_LENGTH}
          selectionColor={BLUE}
          onFocus={this.toggleColor}
          />
      </View>
    );
  }
}
