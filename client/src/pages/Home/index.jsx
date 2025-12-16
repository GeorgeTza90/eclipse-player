import HomeScreen from "../../components/home/HomeScreen";
import MiniPlayer from "../../components/player/MiniPlayer";
import Circle from "../../components/ui/Circle";
import { useIsMobile } from "../../hooks/useIsMobile";

function Home() {
    const isMobile = useIsMobile();

    return (<>
        <div id="heading" style={{ display: "flex", justifyContent: "center", width: '100%' }}>
            <img src="/assets/images/HomeLogo.png" style={{ position: 'absolute', width: 90, top: isMobile ? 10 : 60 }} />
            <Circle size={isMobile ? 400 : 1000} top={-isMobile ? -320 : -880} shadowColor="#201f1fff" color2="#0b0b0bff" color1="#1f1e1eff" />
            <HomeScreen />
            {!isMobile && (<MiniPlayer />)}
        </div>
    </>);
}

export default Home;