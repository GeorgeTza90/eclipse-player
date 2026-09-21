import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContextWeb.tsx";
import { useMiniPlayer } from "@/contexts/MiniPlayerContextWeb";
import { useFetchManager } from "@/hooks/useCallManager";
import { useMinimumLoading } from "@/hooks/useMinimumLoading";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useWidth } from "@/hooks/useScreen";
import MiniPlayer from "@/components/player/mini/MiniPlayer";
import BackButton from "@/components/ui/buttons/BackButton";
import Loader from "@/components/ui/loaders/Loader";
import { Artist } from "@/types/artists.types";
import ArtistInfo from "./parts/ArtistInfo";
import styles from "./artistDetail.module.css";
import ArtistSongs from "./parts/ArtistSongs";

const ArtistDetail = () => {
    const { state, loading, error, call } = useFetchManager();
    const { name } = useParams();
    const isMobile = useIsMobile();
    const width = useWidth();
    const { barMode } = useMiniPlayer();
    const { user } = useAuth();    
    const navigate = useNavigate();    

    const artistName = name ? decodeURIComponent(name) : null;
    const artist: Artist = state.artist;

    useEffect(() => {
        if (!artistName) return;
        call("artist", artistName).catch(() => navigate("/library"));
    }, [artistName, call, navigate]);

    const showLoader = useMinimumLoading(loading.artist || !artist, 500);

    if (showLoader) return (<div style={{ display: "flex", justifyContent: "center" }}><Loader text={"Loading artist"} /></div>);    
    if (error.artist) return <p style={{ color: "#fff", padding: "10px" }}>Error loading artist.</p>;
    if (!artist) return null;

    const backgroundPhoto = { maxWidth: width };

    return (
        <div className={styles.container}>
            {!isMobile && user && !barMode && (<MiniPlayer />)}
            
            {artist.photos?.length > 0 && (
                <img src={artist.photos[0]} alt="" className={styles.backgroundPhoto} style={backgroundPhoto} />
            )}

            {/* Info */}
            <ArtistInfo artist={artist}/>

            {/* Songs */}
            <ArtistSongs artist={artist}/>
            
            {/* Back Button */}
            <BackButton navTo={"/library"} />
            
        </div>
    );
};

export default ArtistDetail;