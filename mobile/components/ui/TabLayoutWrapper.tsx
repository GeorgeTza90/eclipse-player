import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { Fonts } from '@/constants/theme';
import { Tabs } from '@/types/tabs';

export default function TabLayoutWrapper({ title, children }: Tabs) {
  return (
    <ImageBackground
      source={require('@/assets/images/body1.jpg')}
      style={styles.container}
    >
      <Text style={styles.header}>{title}</Text>
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#353636', alignItems: 'center', justifyContent: 'flex-start', paddingTop: 60 },
  header: { fontSize: 32, fontFamily: Fonts.sans, fontWeight: 'bold', color: '#ebebebff' },
});