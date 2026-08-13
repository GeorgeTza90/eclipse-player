import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { IconSympbolProps2, MAPPING } from '@/types/icons';

export function IconSymbol({ name, size = 24, color, style }: IconSympbolProps2) {
    return (
        <MaterialIcons
            color={color}
            size={size}
            name={MAPPING[name]}
            style={style}
        />
    );
}
