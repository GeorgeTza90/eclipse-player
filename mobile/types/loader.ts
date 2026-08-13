import { DimensionValue } from "react-native";

export type LoaderProps = {
    text: string;
    size?: "small" | "large";
    rgb?: boolean;
};

export type LoadingMessageProps = {
    message?: string;
    height?: DimensionValue;
};