import type { PropsWithChildren, ReactElement } from 'react';
import { TextProps, type ViewProps } from 'react-native';

export type ParallaxScrollViewProps = PropsWithChildren<{
    headerImage: ReactElement;
    headerBackgroundColor: { dark: string; light: string };
}>;

export type ThemedTextProps = TextProps & {
    lightColor?: string;
    darkColor?: string;
    type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export type ThemedViewProps = ViewProps & { lightColor?: string; darkColor?: string; };