// components/ui/buttons/ToggleButton.tsx
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { ToggleButtonProps } from '@/types/buttons';

export default function ToggleButton({ heading, isBarMode, value, onChange, inActive }: ToggleButtonProps) {
    return (
        <View style={styles.row}>
            <Text style={[styles.text, isBarMode && styles.textBarMode]}>{heading}</Text>
            <Pressable
                onPress={() => !inActive && onChange(!value)}
                style={[
                    inActive ? styles.toggleInActive : styles.toggle,
                    inActive ? styles.off : (value ? styles.on : styles.off),
                ]}
            >
                <View style={[styles.knob, value && !inActive && styles.knobOn]} />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    row: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
    text: { fontWeight: '300', color: '#9e9e9e', width: 160 },
    textBarMode: { color: '#9e9e9e45' },
    toggle: { width: 40, height: 22, borderRadius: 30, position: 'relative' },
    toggleInActive: { width: 40, height: 22, borderRadius: 30, backgroundColor: '#cccccc24', position: 'relative' },
    on: { backgroundColor: '#858585', borderWidth: 1, borderColor: '#fff' },
    off: { backgroundColor: '#202020', borderWidth: 1, borderColor: '#7e7e7e' },
    knob: { position: 'absolute', top: 3, left: 3, width: 15, height: 15, borderRadius: 50, backgroundColor: '#494949' },
    knobOn: { left: undefined, right: 3, backgroundColor: '#fff' },
});