import { useState } from "react";
import HomeScreen from "../../components/home/HomeScreen";
import MiniPlayer from "../../components/player/MiniPlayer";
import Circle from "../../components/ui/Circle";
import { useAudio } from "../../contexts/AudioContextWeb";
import { useAuth } from "../../contexts/AuthContextWeb";
import { useIsMobile } from "../../hooks/useIsMobile";

function Home() {
    const { currentSong, volume } = useAudio();
    const shadowColor = currentSong?.averageColor ?? "#bebebe";
    const isMobile = useIsMobile();
    const { user, token } = useAuth();


    return (<>
        <div id="heading" style={{ display: "flex", justifyContent: "center", width: '100%' }}>
            <img src="/assets/images/HomeLogo.png" style={{ position: 'absolute', width: 90, top: isMobile ? 10 : 60 }} />
            <Circle size={isMobile ? 400 : 1000} top={-isMobile ? -320 : -880} shadowColor={"#201f1fff"} intensity={volume * 30} color2="#0b0b0bff" color1="#1f1e1eff" />
            <HomeScreen />
            {!isMobile && user && token && (<MiniPlayer />)}
        </div>
    </>);
}

export default Home;