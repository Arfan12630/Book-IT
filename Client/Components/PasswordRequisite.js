import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PasswordRequisite = (props) => {
    console.log('capsLetterFlag:', props.capsLetterFlag);
  console.log('numberCheckFlag:', props.numberCheckFlag);
  console.log('pwdLengthCheckFlag:', props.pwdLengthCheckFlag);
  console.log('specialCharCheckFlag:', props.specialCharCheckFlag);

  return (
    <View style={styles.container}>
      <Text style={[styles.text, props.capsLetterFlag ? styles.valid : styles.invalid]}>
        Must Contain 1 Capital Letter
      </Text>
      <Text style={[styles.text, props.numberCheckFlag ? styles.valid : styles.invalid]}>
        Must contain a number
      </Text>
      <Text style={[styles.text, props.pwdLengthCheckFlag ? styles.valid : styles.invalid]}>
        Must be 8 characters Long
      </Text>
      <Text style={[styles.text, props.specialCharCheckFlag ? styles.valid : styles.invalid]}>
        Must contain a special character
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 0,
  },
  text: {
    color: 'white',
  },
  valid: {
    color: 'green',
  },
  invalid: {
    color: 'red',
  },
});

export default PasswordRequisite;
