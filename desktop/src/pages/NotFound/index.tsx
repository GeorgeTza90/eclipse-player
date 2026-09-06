import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContextWeb.tsx";
import { useMiniPlayer } from "@/contexts/MiniPlayerContextWeb";
import MiniPlayer from "@/components/player/mini/MiniPlayer";
import Circle from "@/components/ui/circles/Circle";

const NotFound = () => {    
    const { barMode, setPlayerPage } = useMiniPlayer();
    const { user } = useAuth();
    const intensity = 12;

    useEffect(() => setPlayerPage(false), []);

    return (<>
        <div id="heading" style={{ display: "flex", justifyContent: "center" }}>
            <img src="/assets/images/logo.png" style={{ position: 'absolute', width: 180, top: 55, zIndex: "99" }} />
            <Circle size={1000} top={-880} intensity={intensity*0.7} color2="#0b0b0bff" color1="#1f1e1eff" />
            <Circle size={300} top={800} intensity={intensity*1} heightOffset={6} color2="#0e0e0eff" color1="#1b1a1aff" />
            <Circle size={600} top={150} intensity={intensity*0.8} heightOffset={8} />
            <p style={{ marginTop: 300, fontSize: 18, zIndex: "1", justifyContent: "center" }}>
                {`Page Not Found !  `}<br/><br/>
                <Link to="/" style={{ color: "#fff", textDecoration: "underline", zIndex: "1", marginLeft: 15 }}>Go back home</Link>
            </p>

            {user && !barMode && (<MiniPlayer />)}
        </div>
    </>);
}

export default NotFound;