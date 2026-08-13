import { StyleSheet, Dimensions, ScrollView } from "react-native";
import { useLibrary } from "@/contexts/LibraryContext";
import { useAuth } from "@/contexts/AuthContext";
import LibraryGroupItem from "./items/LibraryGroupItem";
import SearchForm from "../ui/forms/SearchForm";
import Loader from "../ui/loaders/Loader";

const { width } = Dimensions.get("window");

export default function LibraryScreen() {  
    const { privateAlbums, singlesEps, albums, artists, loading } = useLibrary();
    const { priv_u } = useAuth()
    
    if (loading) return <Loader text="Loading Library" />;    

    return (
        <ScrollView style={{ width: width * 0.96}}>
            <SearchForm />
            {priv_u && <LibraryGroupItem type="Private" group={privateAlbums}/>}
            <LibraryGroupItem type="Singles & EPs" group={singlesEps} />
            <LibraryGroupItem type="Albums" group={albums}/>
            <LibraryGroupItem type="Artists" group={artists}/>   
        </ScrollView>
    );
}