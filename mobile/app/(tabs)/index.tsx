import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import TabLayoutWrapper from '@/components/ui/TabLayoutWrapper';
import Circle from '@/components/ui/circles/Circle';
import Home from '@/components/home/Home';

const width = 150;

export default function HomeScreen() {
  return (
    <TabLayoutWrapper title="">

      <View style={styles.circleContainer}>
        <Circle size={470} shadowColor="#181818ff" color2 = "#0b0b0bff" color1 = "#1f1e1eff"/>             
      </View>

      <Image
        source={require('@/assets/images/HomeLogo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Home />

      </TabLayoutWrapper>
  );
}

const styles = StyleSheet.create({
  circleContainer: { position: 'absolute', alignItems: "center", top: -455, left: -10, right: 0, bottom: 0, zIndex: 0 },
  logo: { width: width, height: width / 3, alignSelf: 'center', marginTop: -70 },
});