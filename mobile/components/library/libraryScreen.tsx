import { useMemo } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { useLibrary } from "@/contexts/LibraryContext";
import { byYear } from "@/utils/songsCetegorizer";
import LibraryGroupItem from "./LibraryGroupItem";
import SearchForm from "../ui/forms/SearchForm";
import Loader from "../ui/loaders/Loader";

const { width } = Dimensions.get("window");

export default function LibraryScreen() {  
    const { songs, artists, loading } = useLibrary();
    const singlesEps = useMemo(() => byYear(songs, "single", "ep"), [songs]);
    const albums = useMemo(() => byYear(songs, "album"), [songs]);

    if (loading) {
        return (
            <Loader text="Loading Library" />
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