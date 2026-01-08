import { Link } from "react-router-dom";
import MiniPlayer from "../../components/player/MiniPlayer";
import Circle from "../../components/ui/Circle";
import { useAuth } from "../../contexts/AuthContextWeb";
import { useIsMobile } from "../../hooks/useIsMobile";

function NotFound() {
    const isMobile = useIsMobile();
    const { user, token } = useAuth();

    return (<>
        <div id="heading" style={{ display: "flex", justifyContent: "center" }}>
            <img src="/assets/images/logo.png" style={{ position: 'absolute', width: 180, top: isMobile ? 10 : 55 }} />
            <Circle size={isMobile ? 400 : 1000} top={-isMobile ? -320 : -880} color2="#0b0b0bff" color1="#1f1e1eff" />
            <Circle size={isMobile ? 230 : 300} top={isMobile ? 550 : 800} heightOffset={6} color2="#0e0e0eff" color1="#1b1a1aff" />
            <Circle size={isMobile ? 385 : 600} top={isMobile ? 110 : 150} heightOffset={8} />
            <p style={{ marginTop: isMobile ? 200 : 300, fontSize: isMobile ? 18 : 20 }}>
                {`Page Not Found.  `}
                <Link to="/" style={{ color: "#fff", textDecoration: "underline" }}>Go back home</Link>
            </p>

            {!isMobile && user && token && (<MiniPlayer />)}
        </div>
    </>);
}

export default NotFound;