import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useAudio } from '@/contexts/AudioContext';
import { formatTime } from '@/hooks/useFormatTime';
import Slider from '@react-native-community/slider';
import PlayButton from '../buttons/PlayButtons';
import Circle from './Circle';

const { width } = Dimensions.get('window');

export default function AudioPlayer() {
  const {
    currentSong, isPlaying,
    togglePlay, stop, next, previous,
    position, duration, volume,
    setVolume, seekTo,
  } = useAudio();

  const shadowColor = currentSong?.averageColor ?? '#bebebe';
  const [intensity, setIntensity ] = useState(30);
  const volMin = 0.000001;

  useEffect(() => {    
    setIntensity(volume * 30);
  },[volume])

  return (
    <View style={styles.container}>

      {/* Circle */}
      <View style={{ position: 'absolute', top: -225, left: -35, right: 0, bottom: 0, zIndex: 0 }}>
        <Circle size={390} shadowColor={shadowColor} intensity={intensity}/>
      </View>
      
      {/* Player */}
      <View style={styles.playerContent}>

        {/* Info */}
        <View style={styles.headerRowWrapper}>
          <View style={styles.headerRow}>
            {currentSong?.image && (
              <Image
                source={{ uri: currentSong?.image }}
                style={styles.albumImageHorizontal}
                contentFit="cover"
                transition={1000}
              />
            )}
            <View style={styles.textContainer}>
              <Text style={styles.title}>{currentSong?.title || 'Song Title'}</Text>
              <Text style={styles.artist}>{currentSong?.artist || 'Artist Name'}</Text>
            </View>
          </View>
        </View>

        {/* Play Buttons */}
        <View style={styles.buttonDiv}>
          <PlayButton type="previous" onPress={previous} />
          <PlayButton type="stop" onPress={stop} />
          <PlayButton type={isPlaying ? "pause" : "play"} onPress={togglePlay} />
          <PlayButton type="next" onPress={next} />
        </View>

        {/* Time Bar */}
        <View style={styles.timeSliderContainer}>
          <Text style={styles.time}>{formatTime(position)}</Text>
          <Slider
            style={{ flex: 1 }}
            minimumValue={0}
            maximumValue={duration}
            value={position}
            minimumTrackTintColor="#ebebeb"
            maximumTrackTintColor="#555"
            thumbTintColor={shadowColor}
            onSlidingComplete={seekTo}
          />
          <Text style={styles.time}>{formatTime(duration)}</Text>
        </View>

        {/* Volume Bar */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: width * 0.8 }}>
          <TouchableOpacity onPress={() => setVolume(volMin)}>
            <Image
              source={require('@/assets/icons/volMin2.png')}
              style={styles.volIcon}              
              contentFit="contain"            
            />
          </TouchableOpacity>
          <Slider
            style={{ width: 200, height: 40, marginHorizontal: 10 }} 
            minimumValue={volMin}
            maximumValue={1}
            value={volume}
            minimumTrackTintColor="#ebebeb"
            maximumTrackTintColor="#555"
            thumbTintColor={shadowColor}
            onValueChange={setVolume}
          />
          <TouchableOpacity onPress={() => setVolume(1)}>
            <Image
              source={require('@/assets/icons/volMax2.png')}
              style={styles.volIcon}
              contentFit="contain"
            />
          </TouchableOpacity>
        </View>     

        {/* Circle 2*/}
        <View style={{ position: 'absolute', top: 180, left: 60, right: 0, bottom: 0, zIndex: 0 }}>
          <Circle size={200} color2 = "#0e0e0eff" color1 = "#1b1a1aff" shadowColor={shadowColor} intensity={intensity * 0.25} heightOffset={-8}/>
        </View>
           
      </View>      
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 160 },
  playerContent: { flex: 1, alignItems: 'center', justifyContent: 'center'},
  headerRowWrapper: { width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  headerRow: { flexDirection: 'row', alignItems: 'center', maxWidth: 400 },
  albumImageHorizontal: { width: 100, height: 100, borderRadius: 15, marginRight: 15 },
  textContainer: {maxWidth: 200},
  title: { fontSize: 16, fontWeight: 'bold', color: '#ebebeb', marginBottom: 10 },
  artist: { fontSize: 14, color: 'rgba(240,248,255,0.6)', marginBottom: 20 },
  buttonDiv: { flexDirection: 'row', justifyContent: 'space-around', width: width * 0.8, marginBottom: 30 },
  songBox: { backgroundColor: '#252525', width: width * 0.8, padding: 20, borderRadius: 25, marginBottom: 30 },
  presetButtons: { flexDirection: 'row', justifyContent: 'space-between', width: width * 0.7 },
  timeSliderContainer: { flexDirection: 'row', alignItems: 'center', width: width * 0.8, marginBottom: 30 },
  volumeSliderContainer: { flexDirection: 'row', alignItems: 'center', width: width * 0.8, marginBottom: 30 },
  time: { width: 40, textAlign: 'center', color: '#fff' },
  volIcon: { width: 40, height: 40, alignSelf: 'center' },
});
