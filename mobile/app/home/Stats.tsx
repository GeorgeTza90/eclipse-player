import { ScrollView, Text, View, Pressable, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import TabLayoutWrapper from '@/components/ui/tabs/TabLayoutWrapper';
import { useAuth } from '@/contexts/AuthContext';
import { fetchPlayStats } from '@/services/GetService';
import { formatDuration } from '@/utils/formatTime';
import { RANGE_OPTIONS } from '@/utils/rangeOption';
import { PlayStats, StatsRange } from '@/types/stats';
import TopSongsList from '@/components/home/stats/TopSongsList';
import HistoryChart from '@/components/home/stats/HistoryChart';

export default function UserSettingsScreen() {
    const { user } = useAuth();

    const [range, setRange] = useState<StatsRange>("1m");
    const [stats, setStats] = useState<PlayStats | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [localError, setLocalError] = useState<string>("");

    useEffect(() => {
        const loadStats = async () => {
            setLoading(true);
            try {
                const data = await fetchPlayStats(range);
                setStats(data);
            } catch (err) {
                setLocalError("Failed to load listening stats");
            } finally {
                setLoading(false);
            }
        };
        loadStats();
    }, [range]);

    return (
        <TabLayoutWrapper title='Stats'>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.heading}>Your statistics</Text>

                {/* Range selector */}
                <View style={styles.rangeSelector}>
                    {RANGE_OPTIONS.map((opt) => (
                        <Pressable
                            key={opt.value}
                            style={[styles.rangeButton, range === opt.value && styles.rangeActive]}
                            onPress={() => setRange(opt.value)}
                        >
                            <Text style={range === opt.value ? styles.rangeActiveText : styles.rangeButtonText}>
                                {opt.label}
                            </Text>
                        </Pressable>
                    ))}
                </View>

                {/* Loading / Error / Empty states */}
                {loading && <Text style={styles.message}>Loading Listening Stats ...</Text>}

                {!loading && localError && (
                    <Text style={styles.message}>{localError}</Text>
                )}

                {!loading && !localError && stats && stats.topSongs.length === 0 && (
                    <Text style={styles.emptyState}>No listening history yet — play something!</Text>
                )}

                {!loading && !localError && stats && stats.topSongs.length > 0 && (
                    <View style={styles.statsContainer}>
                        {/* Total listening time */}
                        <View style={styles.userInfo}>
                            <Text style={styles.label}>Total Listening Time:</Text>
                            <Text style={styles.statValue}>{formatDuration(stats.totalSeconds)}</Text>
                        </View>

                        {/* Top songs */}
                        <Text style={styles.sectionLabel}>Top Songs</Text>
                        <TopSongsList topSongs={stats.topSongs} />

                        {/* History chart */}
                        <Text style={styles.sectionLabel}>Listening History</Text>
                        <HistoryChart history={stats.history} range={range} />
                    </View>
                )}
            </ScrollView>
        </TabLayoutWrapper>
    );
}

const styles = StyleSheet.create({
    container: { paddingBottom: 40 },
    content: { width: '100%' },
    heading: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginTop: 50, marginBottom: 20 },
    backButton: { color: '#888', fontSize: 16, marginTop: 30 },
    rangeSelector: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
    rangeButton: { paddingVertical: 6, paddingHorizontal: 14, borderRadius: 16, backgroundColor: 'rgba(231, 231, 231, 0.15)' },
    rangeButtonText: { color: '#9e9e9e', fontSize: 13 },
    rangeActive: { backgroundColor: '#d1d1d1' },
    rangeActiveText: { color: '#0b342d', fontSize: 13, fontWeight: 'bold' },
    message: { color: '#bdbdbd', fontSize: 14, marginTop: 8 },
    emptyState: { color: '#9e9e9e', fontSize: 14, marginTop: 8 },
    statsContainer: { marginTop: 8 },
    userInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
    label: { color: '#9e9e9e', fontSize: 14 },
    statValue: { color: '#f7f7f7', fontSize: 14, marginLeft: 8 },
    sectionLabel: { color: '#9e9e9e', fontSize: 14, marginTop: 12, marginBottom: 8 },
});