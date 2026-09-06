import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContextWeb.tsx";
import { useAudio } from "@/contexts/AudioContextWeb";
import { useMiniPlayer } from "@/contexts/MiniPlayerContextWeb";
import LibraryScreen from "@/components/library/LibraryScreen";
import MiniPlayer from "@/components/player/mini/MiniPlayer";
import Circle from "@/components/ui/circles/Circle";

const Library = () => {    
    const { barMode, setPlayerPage } = useMiniPlayer();
    const { user } = useAuth();
    const { volume } = useAudio();    

    useEffect(() => setPlayerPage(false), []);

    return (<>
        <div id="heading" style={{ display: "flex", justifyContent: "center", width: '100%' }}>
            <img src="/assets/images/LibraryLogo.png" style={{ position: 'fixed', width: 120, top: 55 , zIndex: "99"}} />
            <Circle size={1000} top={-880} shadowColor={"#201f1fff"} intensity={volume * 30} color2="#0b0b0bff" color1="#1f1e1eff" zIndex={98}/>
            <LibraryScreen />
            {user && !barMode && (<MiniPlayer />)}
        </div>
    </>);
}

export default Library;