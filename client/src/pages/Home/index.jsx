import { useEffect } from "react";
import HomeScreen from "../../components/home/HomeScreen";
import MiniPlayer from "../../components/player/MiniPlayer";
import Circle from "../../components/ui/Circle";
import { useAudio } from "../../contexts/AudioContextWeb";
import { useAuth } from "../../contexts/AuthContextWeb";
import { useMiniPlayer } from "../../contexts/MiniPlayerContextWeb";
import { useIsMobile } from "../../hooks/useIsMobile";

function Home() {
    const { volume } = useAudio();    
    const isMobile = useIsMobile();
    const { barMode, setPlayerPage } = useMiniPlayer();
    const { user } = useAuth();    

    useEffect(() => setPlayerPage(false), []);

    return (<>
        <div id="heading" style={{ display: "flex", justifyContent: "center", width: '100%' }}>
            <img src="/assets/images/HomeLogo.png" style={{ position: 'fixed', width: 85, top: isMobile ? 10 : 55, zIndex: "1" }} />
            <Circle size={isMobile ? 400 : 1000} top={-isMobile ? -320 : -880} shadowColor={"#201f1fff"} intensity={volume * 30} color2="#0b0b0bff" color1="#1f1e1eff" />
            <HomeScreen />
            {!isMobile && user && !barMode && (<MiniPlayer />)}
        </div>
    </>);
}

export default Home;