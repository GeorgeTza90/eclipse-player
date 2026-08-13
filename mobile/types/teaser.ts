import { Href } from "expo-router";

export interface TeaserProps {
    onPress: () => void;
    source: any;
};

export type TeaserParamProps = {
    link: Href;
    source: any;
}