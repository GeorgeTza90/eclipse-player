import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import TabLayoutWrapper from '@/components/ui/TabLayoutWrapper';
import LibraryScreen from '@/components/ui/library/libraryScreen';
import Circle from '@/components/ui/player/Circle';

const width = 150;

export default function PlayerScreen() {
  return (
    <TabLayoutWrapper title="">
      <View style={{ position: 'absolute', top: -450, left: -25, right: 0, bottom: 0, zIndex: 0 }}>
        <Circle size={450} shadowColor="#2c2c2cff" color2 = "#0b0b0bff" color1 = "#1f1e1eff"/>
      </View>
      <Image
          source={require('@/assets/images/LibraryLogo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      <LibraryScreen />
    </TabLayoutWrapper>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: width,
    height: width / 3 ,    
    alignSelf: 'center',
    marginTop: -70,
  },
});