import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const teste = ({ length, onCodeFilled }) => {
  const [code, setCode] = useState(new Array(length).fill(''));
  const inputsRef = useRef([]);

  const focusNext = (index, value) => {
    if (index < length - 1 && value) {
      inputsRef.current[index + 1].focus();
    }
    if (index === length - 1) {
      inputsRef.current[index].blur();
    }
  };

  const focusPrevious = (key, index) => {
    if (key === 'Backspace' && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
    focusNext(index, text);

    if (newCode.join('').length === length) {
      onCodeFilled(newCode.join(''));
    }
  };

  return (
    <View style={styles.container}>
      {code.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => inputsRef.current[index] = ref}
          style={styles.cell}
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={({ nativeEvent }) => focusPrevious(nativeEvent.key, index)}
          keyboardType="numeric"
          maxLength={1}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cell: {
    top: 100,
    width: 40,
    height: 40,
    margin: 5,
    fontSize: 18,
    textAlign: 'center',
    borderBottomWidth: 2,
    borderColor: 'gray',
    backgroundColor: 'blue'
  }
});

export default teste
