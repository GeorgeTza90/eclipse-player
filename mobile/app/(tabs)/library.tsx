import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import TabLayoutWrapper from '@/components/ui/TabLayoutWrapper';
import LibraryScreen from '@/components/library/libraryScreen';
import Circle from '@/components/ui/circles/Circle';

const width = 150;

export default function PlayerScreen() {
  return (
    <TabLayoutWrapper title="">
      
      <View style={styles.circleContainer}>
        <Circle size={470} shadowColor="#2c2c2cff" color2 = "#0b0b0bff" color1 = "#1f1e1eff"/>
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
  circleContainer: { position: 'absolute', alignItems: "center", top: -455, left: -10, right: 0, bottom: 0, zIndex: 0 },
  logo: { width: width, height: width / 3, alignSelf: 'center', marginTop: -70 },
});