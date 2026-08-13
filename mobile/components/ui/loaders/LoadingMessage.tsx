import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { LoadingMessageProps } from '@/types/loader';

export default function LoadingMessage({ message = 'Loading Collection ...', height = '50%' }: LoadingMessageProps) {
    return (
        <View style={[styles.container, { height }]}>
            <ActivityIndicator size="small" color="#fff" />
            <Text style={styles.text}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { alignItems: 'center', justifyContent: 'center' },
    text: { color: '#fff', marginTop: 8, fontSize: 14 },
});