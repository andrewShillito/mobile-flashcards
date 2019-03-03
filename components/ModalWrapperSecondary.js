import React from "react";
import { Modal, TouchableWithoutFeedback, View } from "react-native";
import styles from "../styles/modalWrapperSecondary";

export default function ModalWrapperSecondary({ visible, onRequestClose, children, onPressOutside, transparent }) {
  return (
    <Modal
      visible={visible}
      onRequestClose={onRequestClose}
      transparent={transparent ? transparent : false}
      animationType="slide"
    >
      <TouchableWithoutFeedback onPress={onPressOutside}>
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.content}>
              {children}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
