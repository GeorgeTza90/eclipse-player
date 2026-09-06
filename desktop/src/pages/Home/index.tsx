import { useEffect } from "react";
import { useAudio } from "@/contexts/AudioContextWeb";
import { useAuth } from "@/contexts/AuthContextWeb.tsx";
import { useMiniPlayer } from "@/contexts/MiniPlayerContextWeb";
import HomeScreen from "@/components/home/HomeScreen";
import MiniPlayer from "@/components/player/mini/MiniPlayer";
import Circle from "@/components/ui/circles/Circle";

const Home = () => {
    const { volume } = useAudio();        
    const { barMode, setPlayerPage } = useMiniPlayer();
    const { user } = useAuth();    

    useEffect(() => setPlayerPage(false), []);

    return (<>
        <div id="heading" style={{ display: "flex", justifyContent: "center", width: '100%' }}>
            <img src="/assets/images/HomeLogo.png" style={{ position: 'fixed', width: 85, top: 55, zIndex: "99" }} />
            <Circle size={1000} top={-880} shadowColor={"#201f1fff"} intensity={volume * 30} color2="#0b0b0bff" color1="#1f1e1eff" zIndex={98} />
            <HomeScreen />
            {user && !barMode && (<MiniPlayer />)}
        </div>
    </>);
}

export default Home;