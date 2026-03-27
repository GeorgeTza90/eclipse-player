import { useEffect, useState } from "react";
import AudioPlayer from "../../components/player/AudioPlayer";
import Lyrics from "../../components/player/Lyrics";
import Playlist from "../../components/player/Playlist";
import Circle from "../../components/ui/Circle";
import { useAudio } from "../../contexts/AudioContextWeb";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useMiniPlayer } from "../../contexts/MiniPlayerContextWeb";
import Equalizer from "../../components/player/Equalizer";

function Player() {
    const isMobile = useIsMobile();
    const { playlistName, currentSong, volume } = useAudio("No Gods In Heaven");
    const { setPlayerPage, coloredGlow } = useMiniPlayer();    
    const [extention, setExtention] = useState("Playlist");
    const [shadowColor, setShadowColor] = useState(currentSong?.averageColor ?? "#bebebe");

    const handleExtention = (key) => setExtention(key);

    useEffect(() => setPlayerPage(true), []);    
    useEffect(() => {  if (!coloredGlow) setShadowColor("#bebebe"); else setShadowColor(currentSong?.averageColor); }, [coloredGlow]);

    return (
        <div id="heading" style={{ display: "flex", justifyContent: "center" }}>
            <img src="/assets/images/logo.png" style={{ position: 'fixed', width: 180, top: isMobile ? 10 : 55, zIndex: "1" }} />
            <Circle size={isMobile ? 400 : 1000} top={-isMobile ? -320 : -880} shadowColor={shadowColor ? shadowColor : "#201f1fff"} intensity={volume * 15} color2="#0b0b0bff" color1="#1f1e1eff" />

            <AudioPlayer onToggleExtention={handleExtention} />

            {extention === "Playlist" && <Playlist name={playlistName} />}
            {extention === "Lyrics" && <Lyrics currentSong={currentSong} />}
            {extention === "Equalizer" && <Equalizer color={shadowColor}/>}            
        </div>
    );
}

export default Player;
