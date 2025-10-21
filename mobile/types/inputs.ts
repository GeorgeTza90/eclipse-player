export type PasswordInputProps = {
    value: string;
    onChangeText: (v: string) => void;
    show: boolean;
    setShow: (v: boolean) => void;
    placeholder: string;
};