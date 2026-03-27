import { Link } from 'react-router-dom';
import styles from "./footer.module.css"
import { useMiniPlayer } from '../../contexts/MiniPlayerContextWeb';
import MiniPlayerBar from '../../components/player/MiniPlayerBar';
import { useAudio } from '../../contexts/AudioContextWeb';
import { useEffect, useState } from 'react';
import hexToRgba from '../../utils/hexToRgba';
import { useImageToast } from '../../components/ui/ΙmageToast';

function Footer() {
    const { currentSong, volume } = useAudio();
    const { coloredGlow, showGlow } = useMiniPlayer();
    const { barMode, playerPage, showMiniPlayer } = useMiniPlayer();
    const [shadowColor, setShadowColor] = useState(currentSong?.averageColor ?? "#bebebe");
    const { showImageToast, ImageToastUI } = useImageToast();

    useEffect(() => { if (!coloredGlow) setShadowColor("#bebebe00"); else setShadowColor(currentSong?.averageColor); }, [coloredGlow, currentSong]);

    const MBstyle = {
        background: `linear-gradient(to top left, ${showGlow ? (!coloredGlow ? "#171717" : hexToRgba(shadowColor, 0.2)) : "#141414"}, ${showGlow ? (!coloredGlow ? "#141414" : "#171717") : "#141414" } ${volume*90}%)`,
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        zIndez: 99999,        
    }

    return (<>
        {/* Desktop */}
        {(!barMode || !showMiniPlayer || playerPage) &&
            <div className={styles.footer} >
                <br />
                <a href="/player" className={styles.trademark}>&copy;{new Date().getFullYear()} Eclipse Player</a>
                <label className={styles.labeled}>by George Tzachristas</label>
                <br />
            </div >
        }   

        {barMode && showMiniPlayer && !playerPage  &&
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