import { View, Text, StyleSheet } from 'react-native';
import { formatBucketLabel } from '@/utils/formatBarChart';
import type { HistoryChartProps } from '@/types/stats';

const CHART_HEIGHT = 140;

const HistoryChart = ({ history, range }: HistoryChartProps) => {
    const maxPlays = Math.max(...history.map((h) => h.playCount), 1);

    return (
        <View style={styles.container}>
            <View style={styles.chartArea}>
                {history.map((h) => {
                    const barHeight = Math.max((h.playCount / maxPlays) * CHART_HEIGHT, 2);
                    return (
                        <View key={h.bucket} style={styles.barColumn}>
                            <Text style={styles.barValue}>{h.playCount}</Text>
                            <View style={[styles.bar, { height: barHeight }]} />
                            <Text style={styles.barLabel} numberOfLines={1}>
                                {formatBucketLabel(h.bucket, range)}
                            </Text>
                        </View>
                    );
                })}
            </View>
        </View>
    );
};

export default HistoryChart;

const styles = StyleSheet.create({
    container: { marginTop: 4 },
    chartArea: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        height: CHART_HEIGHT + 40,
        gap: 6,
    },
    barColumn: { flex: 1, alignItems: 'center', justifyContent: 'flex-end' },
    barValue: { color: '#9e9e9e', fontSize: 10, marginBottom: 2 },
    bar: { width: '20%', backgroundColor: '#d6d6d6', borderRadius: 3 },
    barLabel: { color: '#9e9e9e', fontSize: 9, marginTop: 4 },
});