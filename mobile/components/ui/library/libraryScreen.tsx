import React, { useMemo } from "react";
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import { useLibrary } from "@/contexts/LibraryContext";
import SearchForm from "./SearchForm";
import LibraryGroupItem from "./LibraryGroupItem";
import { byYear } from "@/utils/songsCetegorizer";

const { width } = Dimensions.get("window");

export default function LibraryScreen() {  
  const { songs, artists, loading } = useLibrary();
  const singlesEps = useMemo(() => byYear(songs, "single", "ep"), [songs]);
  const albums = useMemo(() => byYear(songs, "album"), [songs]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={{ color: "#fff", marginTop: 10 }}>Loading library...</Text>
      </View>
    );
  }

  return (
    <View style={{ width: width * 0.96}}>
      <SearchForm />
      <LibraryGroupItem type="Singles & EPs" group={singlesEps} />
      <LibraryGroupItem type="Albums" group={albums}/>
      <LibraryGroupItem type="Artists" group={artists}/>   
    </View>    
  );
}

const styles = StyleSheet.create({  
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
});