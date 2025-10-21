import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider, DarkTheme, DefaultTheme } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AudioProvider } from "@/contexts/AudioContext";
import { LibraryProvider } from "@/contexts/LibraryContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { useColorScheme } from "@/hooks/use-color-scheme";


export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AuthProvider>
          <LibraryProvider>
            <AudioProvider>

              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="modal" options={{ presentation: "modal" }} />
              </Stack>
              <StatusBar style="auto" />

            </AudioProvider>
          </LibraryProvider>   
        </AuthProvider>  
      </ThemeProvider>
    </GestureHandlerRootView>

  );
}
