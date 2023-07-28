import React from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Text } from 'react-native';

const ConfirmationModal = ({ visible, onClose, children }) => {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {children}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  closeButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
    padding: 10,
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
  },
});

export default ConfirmationModal;
