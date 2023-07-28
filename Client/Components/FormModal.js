import React from 'react';
import { View, Modal, Text, TextInput, Button, StyleSheet, TouchableWithoutFeedback } from 'react-native';

const FormModal = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} transparent>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
      <View style={styles.container}>
        <Text>Enter your information:</Text>
        <TextInput placeholder="Enter Name Restaurant Name" style={styles.input} />
        
        {/* Add more form fields as needed */}
        <Button title="Submit" onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    position: 'absolute',
    top: '40%',
    left: '10%',
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default FormModal;
