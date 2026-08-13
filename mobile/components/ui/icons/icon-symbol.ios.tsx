import { SymbolView } from 'expo-symbols';
import { IconSympbolProps1 } from '@/types/icons';

export function IconSymbol({ name, size = 24, color, style, weight = 'regular' }: IconSympbolProps1) {
    return (
        <SymbolView
            weight={weight}
            tintColor={color}
            resizeMode="scaleAspectFit"
            name={name}
            style={[ { width: size, height: size }, style ]}
        />
    );
}
