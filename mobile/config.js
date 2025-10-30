import Constants from "expo-constants";

export const API_URL = Constants.expoConfig?.extra?.API_URL;

export const GOOGLE_CLIENT_IDS = {
  expoClientId: Constants.expoConfig?.extra?.EXPO_CLIENT_ID,
  iosClientId: Constants.expoConfig?.extra?.IOS_CLIENT_ID,
  androidClientId: Constants.expoConfig?.extra?.ANDROID_CLIENT_ID,
  webClientId: Constants.expoConfig?.extra?.WEB_CLIENT_ID,
};
