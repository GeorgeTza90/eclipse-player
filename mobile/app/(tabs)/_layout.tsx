import React from 'react';
import { Tabs } from 'expo-router';
import { Image } from 'react-native';
import { HapticTab } from '@/components/ui/tabs/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'dark'].tint,
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarShowLabel: false,
                tabBarStyle: { height: 80, paddingTop: 8, paddingBottom: 90 },
        }}>

            <Tabs.Screen
                name="index"
                options={{        
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={require('@/assets/icons/home.png')}
                            style={{ width: 38, height: 35, tintColor: focused ? Colors.light.tint : Colors.light.icon }}
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
                            style={{ width: 38, height: 35, tintColor: focused ? Colors.light.tint : Colors.light.icon }}
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
                            style={{ width: 38, height: 35, tintColor: focused ? Colors.light.tint : Colors.light.icon }}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
