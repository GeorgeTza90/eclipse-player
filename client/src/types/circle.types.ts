export interface CircleStyleProps {
    size: number;
    top: number;
    left: number;
    zIndex: number;
    intensity: number;
    heightOffset: number;
    shadowColor:string;
    goRGB: boolean;
    coloredGlow: boolean;
    gradientColors?: string[];    
}

export interface CircleProps {
    size: number;
    top: number;
    left?: number;
    shadowColor?: string;
    color1?: string;
    color2?: string;
    colors?: string[];
    intensity: number;
    heightOffset?: number;
    zIndex?: number;
}