import { StyleProp, TextStyle } from "react-native";

export type PasswordInputProps = {
    value: string;
    onChangeText: (v: string) => void;
    show: boolean;
    setShow: (v: boolean) => void;
    placeholder: string;
};

export type FormInputProps = {
    placeholder?: string;
    value: string;
    onChangeText: (text: string) => void;
    style?: StyleProp<TextStyle>;
    isForm?: boolean;
    keyboardType?: 'default' | 'email-address' | 'numeric';
    secureTextEntry?: boolean;
    
};