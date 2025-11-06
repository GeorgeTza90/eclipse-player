import { Song } from "@/types/songs";
import { Artist } from "@/types/artists";

export type Cards = {
    songItem?: Song;
    artistItem?: Artist;
    onPress: () => void;
};

