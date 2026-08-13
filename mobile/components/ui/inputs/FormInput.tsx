import { TextInput, StyleSheet } from 'react-native';
import { FormInputProps } from '@/types/inputs';

export default function FormInput({
    placeholder, value, onChangeText, style, isForm = true, keyboardType = 'default', secureTextEntry = false    
}: FormInputProps) {
    return (
        <TextInput
            placeholder={placeholder}            
            value={value ?? ''}
            onChangeText={onChangeText}
            style={[isForm ? styles.input1 : styles.input2, style]}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            autoCapitalize="none"
        />
    );
}

const styles = StyleSheet.create({
    input1: { height: 40, color: "#131313ff", borderColor: '#ccc', borderWidth: 1, borderRadius: 8, backgroundColor: '#fff', marginBottom: 10, paddingHorizontal: 10 },
    input2: { color: '#fff', borderColor: '#555', borderWidth: 1, paddingHorizontal: 8, borderRadius: 6, backgroundColor: 'transparent' },
});