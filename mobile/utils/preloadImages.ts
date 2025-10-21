import { Image } from "react-native";

export async function preloadImages(urls: string[]) {
    const imagePromises = urls.map((url) => Image.prefetch(encodeURI(url)));
    await Promise.all(imagePromises);
}
