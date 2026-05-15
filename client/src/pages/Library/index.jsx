import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContextWeb";
import { useAudio } from "../../contexts/AudioContextWeb";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useMiniPlayer } from "../../contexts/MiniPlayerContextWeb";
import LibraryScreen from "../../components/library/LibraryScreen";
import MiniPlayer from "../../components/player/MiniPlayer";
import Circle from "../../components/ui/circles/Circle";

const Library = () => {
    const isMobile = useIsMobile();
    const { barMode, setPlayerPage } = useMiniPlayer();
    const { user } = useAuth();
    const { volume } = useAudio();    

    useEffect(() => setPlayerPage(false), []);

    return (<>
        <div id="heading" style={{ display: "flex", justifyContent: "center", width: '100%' }}>
            <img src="/assets/images/LibraryLogo.png" style={{ position: 'fixed', width: 120, top: isMobile ? 10 : 55 , zIndex: "99999"}} />
            <Circle size={isMobile ? 400 : 1000} top={isMobile ? -320 : -880} shadowColor={"#201f1fff"} intensity={volume * 30} color2="#0b0b0bff" color1="#1f1e1eff" zIndex={9999}/>
            <LibraryScreen />
            {!isMobile && user && !barMode && (<MiniPlayer />)}
        </div>
    </>);
}

export default Library;