import { View, Text, Pressable, StyleSheet } from 'react-native';
import { LoudnessPresetKey } from '@/utils/loudnessPresets';
import { LoudnessPresetButtonProps } from '@/types/buttons';

const presets: { id: LoudnessPresetKey; label: string }[] = [
    { id: 'quiet', label: 'Quiet' },
    { id: 'normal', label: 'Normal' },
    { id: 'loud', label: 'Loud' },
];

const activePosition: Record<LoudnessPresetKey, `${number}%`> = {
    quiet: '0%',
    normal: '33.33%',
    loud: '66.66%',
};

export default function LoudnessPresetButton({ heading, value, onChange, disabled = false }: LoudnessPresetButtonProps) {
    return (
        <View style={styles.container}>
            <Text style={[styles.text, disabled && styles.textDisabled]}>{heading}</Text>
            <View style={[styles.track, disabled ? styles.off : styles.on]}>
                <View
                    style={[
                        styles.thumb,
                        disabled ? styles.thumbInActive : styles.thumbActive,
                        { left: activePosition[value] },
                    ]}
                />
                {presets.map((preset) => (
                    <Pressable
                        key={preset.id}
                        disabled={disabled}
                        style={[styles.button, disabled && styles.buttonDisabled]}
                        onPress={() => onChange(preset.id)}
                    >
                        <Text style={styles.buttonText}>{preset.label}</Text>
                    </Pressable>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flexDirection: 'row', alignItems: 'center', gap: 16 },
    text: { fontWeight: '300', color: '#9e9e9e', width: 160 },
    textDisabled: { color: '#9e9e9e45' },
    track: { position: 'relative', flexDirection: 'row', alignItems: 'center', width: 200, height: 24, borderRadius: 16, backgroundColor: '#33333349', borderWidth: 1, borderColor: '#16161671', overflow: 'hidden' },
    on: { borderColor: '#fff' },
    off: { borderColor: '#7e7e7e' },
    thumb: { position: 'absolute', width: '33.33%', height: '100%', borderRadius: 13 },
    thumbActive: { backgroundColor: '#9696969b' },
    thumbInActive: { backgroundColor: '#cccccc24' },
    button: { flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' },
    buttonDisabled: { opacity: 0.4 },
    buttonText: { color: '#fff', fontSize: 13 },
});