import type { ChangeEvent, Dispatch, SetStateAction } from "react";

export interface FormInputProps {
    type: string;
    name?: string;
    placeholder?: string;
    value?: string;
    onChangeText: (value: string) => void;
    isForm?: boolean;
}

export interface PasswordInputProps {
    value: string;
    show: boolean;
    placeholder?: string;
    onChangeText: (value: string) => void;
    setShow: Dispatch<SetStateAction<boolean>>;
}

export interface SearchInputProps {
    placeholder?: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}