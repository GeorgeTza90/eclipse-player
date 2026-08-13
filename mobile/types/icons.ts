import { ComponentProps } from 'react';
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { SymbolViewProps, SymbolWeight } from "expo-symbols";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export interface IconSympbolProps1 {
    name: SymbolViewProps['name'] ;
    size?: number;
    color: string;
    style?: StyleProp<ViewStyle>;
    weight?: SymbolWeight;
}

export interface IconSympbolProps2 {
    name:  IconSymbolName;
    size?: number;
    color: string;
    style?: StyleProp<TextStyle>;
    weight?: SymbolWeight;
}

export type IconMapping = Record<SymbolViewProps['name'], ComponentProps<typeof MaterialIcons>['name']>;

type IconSymbolName = keyof typeof MAPPING;

export const MAPPING = {
    'house.fill': 'home',
    'paperplane.fill': 'send',
    'chevron.left.forwardslash.chevron.right': 'code',
    'chevron.right': 'chevron-right',
} as IconMapping;