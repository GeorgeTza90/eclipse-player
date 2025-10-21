import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PasswordInputProps } from '@/types/inputs';

export default function PasswordInput({
  value, show, placeholder, onChangeText, setShow, 
}: PasswordInputProps) {
  return (
    <View style={styles.inputWrapper}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!show}
        style={styles.input}
      />
      <TouchableOpacity style={styles.eyeIcon} onPress={() => setShow(!show)}>
        <Ionicons name={show ? 'eye' : 'eye-off'} size={20} color="#555" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: { position: 'relative', width: 260 },
  input: { height: 40, borderColor: '#ccc', borderWidth: 1, paddingHorizontal: 10, borderRadius: 8, backgroundColor: '#fff', paddingRight: 40, marginBottom: 12 },
  eyeIcon: { position: 'absolute', right: 10, top: 10 },
});
