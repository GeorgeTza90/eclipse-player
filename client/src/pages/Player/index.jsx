import AudioPlayer from "../../components/player/AudioPlayer";
import Playlist from "../../components/player/Playlist"
import Circle from "../../components/ui/Circle";
import { useAudio } from "../../contexts/AudioContextWeb";
import { useIsMobile } from "../../hooks/useIsMobile";

function Player() {
    const isMobile = useIsMobile();
    const { playlistName } = useAudio();

    console.log(playlistName);

    return (<>
        <div id="heading" style={{ display: "flex", justifyContent: "center" }}>
            <img src="/assets/images/logo.png" style={{ position: 'absolute', width: 180, top: isMobile ? 10 : 55 }} />
            <Circle size={isMobile ? 400 : 1000} top={-isMobile ? -320 : -880} shadowColor="#201f1fff" color2="#0b0b0bff" color1="#1f1e1eff" />
            <AudioPlayer />
            <Playlist name={playlistName && playlistName} />
        </div>
    </>);
}

export default Player;