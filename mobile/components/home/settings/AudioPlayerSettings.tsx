import { View, StyleSheet } from 'react-native';
import { useAudio } from '@/contexts/AudioContext';
import { useToast } from '@/contexts/ToastContext';
import LoudnessPresetButton from '../../ui/buttons/LoudnessPresetButton';
import ToggleButton from '../../ui/buttons/ToggleButton';

export default function AudioPlayerSettings() {
    const { normalization, setNormalization, loudnessPreset, setLoudnessPreset, colored, setColored } = useAudio();
    const { showToast } = useToast();

    const handleNormalizationChange = (value: boolean) => {
        setNormalization(value);
        showToast(value ? 'Normalization: ON' : 'Normalization: OFF', 'info');
    };

    return (
        <View style={styles.container}>
            <ToggleButton heading="Colored" value={colored} onChange={setColored} />
            <ToggleButton heading="Normalize Sound" value={normalization} onChange={handleNormalizationChange} />
            <LoudnessPresetButton
                heading="Loudness Level"
                value={loudnessPreset}
                onChange={setLoudnessPreset}
                disabled={!normalization}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { gap: 20 },
});