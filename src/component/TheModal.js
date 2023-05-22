import React, { useState } from 'react';
import { Button, Modal, Text, View } from 'react-native';

const TheModal = (props) => {
  if (!props.setModalVisible) {
    return null
  }

  return (
    <Modal
      animationType={props.animationType ? props.animationType : "slide"}
      transparent={props.transparent ? props.transparent : true}
      visible={props.setModalVisible}
    >
      {props.children}

    </Modal>
  );
};

export default TheModal;