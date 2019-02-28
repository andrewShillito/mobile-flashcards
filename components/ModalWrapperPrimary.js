import React from "react";
import { Modal, TouchableWithoutFeedback, View, Keyboard } from "react-native";
import styles from "../styles/modalWrapperPrimary";

export default function ModalWrapperPrimary({ visible, onRequestClose, children, onPressOutside }) {
  return (
    <Modal
      visible={visible}
      onRequestClose={onRequestClose}
      transparent={true}
      animationType="slide"
    >
      <TouchableWithoutFeedback onPress={onPressOutside}>
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.content}>
              {children}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
