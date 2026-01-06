import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import TabLayoutWrapper from '@/components/ui/TabLayoutWrapper';
import AudioPlayer from '@/components/ui/player/AudioPlayer';
import Playlist from '@/components/ui/player/Playlist';
import Lyrics from '@/components/ui/player/Lyrics';
import Circle from '@/components/ui/player/Circle';
import { useAudio } from '@/contexts/AudioContext';

const width = 250;

export default function PlayerScreen() {
  const { playlistName, currentSong, volume } = useAudio();  
  const shadowColor = currentSong?.averageColor ?? '#bebebe';
  const [lyricsActive, setLyricsActive] = useState(false);

  const handleLyricsToggle = (active: boolean) => {
    setLyricsActive(active);
  };

  return (
    <TabLayoutWrapper title="">
      <View style={{ position: 'absolute', top: -440, left: -10, right: 0, bottom: 0, zIndex: 0 }}>
        <Circle size={450} shadowColor="#3d3d3dff" color2 = "#0a0a0aff" color1 = "#1f1e1eff"/>
      </View>
      
      <Image
        source={require('@/assets/images/logo.png')}
        style={styles.logo}
        contentFit="contain"        
      />
      
      <AudioPlayer onToggleLyrics={handleLyricsToggle} />
      
      {lyricsActive ? (
        <Lyrics currentSong={currentSong} />
      ) : (
        <Playlist name={playlistName || ''} />
      )}
    </TabLayoutWrapper>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: width,
    height: width / 4.5,
    alignSelf: 'center',
    marginTop: -70,
  },
});
