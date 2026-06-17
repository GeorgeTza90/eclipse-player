import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { useAudio } from '@/contexts/AudioContext';
import TabLayoutWrapper from '@/components/ui/TabLayoutWrapper';
import AudioPlayer from '@/components/player/AudioPlayer';
import Playlist from '@/components/player/Playlist';
import Lyrics from '@/components/player/Lyrics';
import Circle from '@/components/ui/circles/Circle';

const width = 250;

export default function PlayerScreen() {
  const { currentSong } = useAudio();  
  const shadowColor = currentSong?.averageColor ?? '#bebebe';  
  const [extention, setExtention] = useState("Playlist");

  const handleExtention = (key: string) => setExtention(key);  

  return (
    <TabLayoutWrapper title="">
      
      <View style={styles.circleContainer}>
        <Circle size={470} shadowColor={shadowColor} color2 = "#0a0a0aff" color1 = "#1f1e1eff"/>
      </View>
      
      <Image
        source={require('@/assets/images/logo.png')}
        style={styles.logo}
        contentFit="contain"        
      />
      
      <AudioPlayer onToggleExtention={handleExtention} />      

      {extention === "Playlist" && <Playlist/>}
      {extention === "Lyrics" && <Lyrics/>}
      {/* {extention === "Equalizer" && <Equalizer color={shadowColor}/>}  */}

    </TabLayoutWrapper>
  );
}

const styles = StyleSheet.create({
  circleContainer: { position: 'absolute', alignItems: "center", top: -455, left: -10, right: 0, bottom: 0, zIndex: 0 },
  logo: { width: width, height: width / 4.5, alignSelf: 'center', marginTop: -70 },
});
