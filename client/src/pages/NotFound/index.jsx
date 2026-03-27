import { Link } from "react-router-dom";
import MiniPlayer from "../../components/player/MiniPlayer";
import Circle from "../../components/ui/Circle";
import { useAuth } from "../../contexts/AuthContextWeb";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useMiniPlayer } from "../../contexts/MiniPlayerContextWeb";
import { useEffect } from "react";

function NotFound() {
    const isMobile = useIsMobile();
    const { barMode, setPlayerPage } = useMiniPlayer();
    const { user } = useAuth();
    const intensity = 12;

    useEffect(() => setPlayerPage(false), []);

    return (<>
        <div id="heading" style={{ display: "flex", justifyContent: "center" }}>
            <img src="/assets/images/logo.png" style={{ position: 'absolute', width: 180, top: isMobile ? 10 : 55, zIndex: "5" }} />
            <Circle size={isMobile ? 400 : 1000} top={-isMobile ? -320 : -880} intensity={intensity*0.7} color2="#0b0b0bff" color1="#1f1e1eff" />
            <Circle size={isMobile ? 230 : 300} top={isMobile ? 550 : 800} intensity={intensity*1} heightOffset={6} color2="#0e0e0eff" color1="#1b1a1aff" />
            <Circle size={isMobile ? 385 : 600} top={isMobile ? 110 : 150} intensity={intensity*0.8} heightOffset={8} />
            <p style={{ marginTop: isMobile ? 200 : 300, fontSize: isMobile ? 16 : 18, zIndex: "1", justifyContent: "center" }}>
                {`Page Not Found !  `}<br/><br/>
                <Link to="/" style={{ color: "#fff", textDecoration: "underline", zIndex: "1", marginLeft: 15 }}>Go back home</Link>
            </p>

            {!isMobile && user && !barMode && (<MiniPlayer />)}
        </div>
    </>);
}

export default NotFound;