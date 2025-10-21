import { Tabs } from 'expo-router';
import React from 'react';
import { Image } from 'react-native';
import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarShowLabel: false,
      }}>

    <Tabs.Screen
      name="index"
      options={{        
        tabBarIcon: ({ focused }) => (
          <Image
            source={require('@/assets/icons/home.png')}
            style={{
              width: 35,
              height: 35,
              tintColor: focused ? Colors.light.tint : Colors.light.icon, 
            }}
          />
        ),
      }}
    />
    <Tabs.Screen
      name="player"
      options={{        
        tabBarIcon: ({ focused }) => (
          <Image
            source={require('@/assets/icons/player.png')}
            style={{
              width: 35,
              height: 35,
              tintColor: focused ? Colors.light.tint : Colors.light.icon, 
            }}
          />
        ),
      }}
    />    
    <Tabs.Screen
      name="library"
      options={{        
        tabBarIcon: ({ focused }) => (
          <Image
            source={require('@/assets/icons/library.png')}
            style={{
              width: 35,
              height: 35,
              tintColor: focused ? Colors.light.tint : Colors.light.icon, 
            }}
          />
        ),
      }}
    />   

    </Tabs>
  );
}
