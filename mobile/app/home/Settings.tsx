import { ScrollView, Text, StyleSheet } from 'react-native';
import AudioPlayerSettings from '@/components/home/settings/AudioPlayerSettings';
import UserSettings from '@/components/home/settings/UserSettings';
import TabLayoutWrapper from '@/components/ui/tabs/TabLayoutWrapper';

export default function UserSettingsScreen() {
    return (
        <TabLayoutWrapper title='Settings'>
            <ScrollView contentContainerStyle={styles.container}>            
                    <Text style={styles.heading}>User Settings</Text>
                    <UserSettings />
                    
                    <Text style={styles.heading}>Audio Player Settings</Text>
                    <AudioPlayerSettings />            
            </ScrollView>
        </TabLayoutWrapper>
    );
}

const styles = StyleSheet.create({
    container: {  },
    content: { width: '100%' },
    heading: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginTop: 50, marginBottom: 20 },
    backButton: { color: '#888', fontSize: 16, marginTop: 30 },
});