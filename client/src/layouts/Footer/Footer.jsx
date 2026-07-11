import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMiniPlayer } from '../../contexts/MiniPlayerContextWeb';
import { useAudio } from '../../contexts/AudioContextWeb';
import { useImageToast } from '../../components/ui/toasts/ΙmageToast';
import MiniPlayerBar from '../../components/player/mini/MiniPlayerBar';
import hexToRgba from '../../utils/hexToRgba';
import styles from "./footer.module.css"
import { useAuth } from '../../contexts/AuthContextWeb';

const Footer = () => {
    const { currentSong, volume } = useAudio();
    const { user } = useAuth();
    const { coloredGlow, showGlow, goRGB } = useMiniPlayer();
    const { barMode, playerPage, showMiniPlayer } = useMiniPlayer();    
    const { ImageToastUI, showImageToast } = useImageToast();
    const [shadowColor, setShadowColor] = useState(currentSong?.averageColor ?? "#bebebe");

    useEffect(() => { if (!coloredGlow) setShadowColor("#bebebe00"); else setShadowColor(currentSong?.averageColor ?? "#bebebe"); }, [coloredGlow, currentSong]);    

    const MBstyle = {
        background: goRGB
            ? ``
            : `linear-gradient(to top left, ${showGlow ? (!coloredGlow ? "#171717" : hexToRgba(shadowColor, 0.2)) : "#141414"}, ${showGlow ? (!coloredGlow ? "#141414" : "#171717") : "#141414" } ${volume*90}%)`,
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        zIndez: 9,  
    }

    return (<>
        {/* Desktop */}
        {(!barMode || !showMiniPlayer || playerPage || !user) &&
            <div className={styles.footer} >                
                <a href="/player" className={styles.trademark}>&copy;{new Date().getFullYear()} Eclipse Player</a>
                <label className={styles.labeled}>by George Tzachristas</label>
                <br />
            </div >
        }   

        {/* Mini Player Bar */}
        {barMode && showMiniPlayer && !playerPage  && user &&
            <>                
                {ImageToastUI}
                <div className={styles.player} style={MBstyle}>                    
                    <MiniPlayerBar handleImageToast={showImageToast}/>                    
                </div>
            </>            
        }

        {/* Mobile */}
        <div className={styles.nav}>
            <div className={styles.mobileOnly}>
                <div className={styles.all} >
                    <Link to="/" className={styles.homeLogo} />
                    <Link to="/player" className={styles.playerLogo} />
                    <Link to="/library" className={styles.libraryLogo} />
                </div>
            </div >
        </div>
    </>);
}

export default Footer;