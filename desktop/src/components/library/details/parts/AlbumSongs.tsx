import { AlbumSongsProps } from "@/types/library.types";
import { useAuth } from "@/contexts/AuthContextWeb";
import TrackItem from "../items/TrackItem";

const AlbumSongs = ({ albumSongs, onPress }: AlbumSongsProps) => {
    const { user } = useAuth();

    return (
        <div>
            {albumSongs.map((item, index) => (
                <TrackItem
                    key={item.id}
                    track={item}
                    index={index}
                    onPress={onPress}
                    user={user}
                    isPrivate={false}
                />
            ))}
        </div>
    );
}

export default AlbumSongs;