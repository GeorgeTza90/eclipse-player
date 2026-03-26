import { Link } from 'react-router-dom';
import styles from "./footer.module.css"
import { useMiniPlayer } from '../../contexts/MiniPlayerContextWeb';
import MiniPlayerBar from '../../components/player/MiniPlayerBar';
import { useAudio } from '../../contexts/AudioContextWeb';
import { useEffect, useState } from 'react';
import hexToRgba from '../../utils/hexToRgba';

function Footer() {
    const { currentSong } = useAudio();
    const { coloredGlow } = useMiniPlayer();
    const { barMode, playerPage, showMiniPlayer } = useMiniPlayer();
    const [shadowColor, setShadowColor] = useState(currentSong?.averageColor ?? "#bebebe");

    useEffect(() => { if (!coloredGlow) setShadowColor("#bebebe00"); else setShadowColor(currentSong?.averageColor); }, [coloredGlow, currentSong]);

    const MBstyle = {
        background: `linear-gradient(to top, ${!coloredGlow ? "#171717" : hexToRgba(shadowColor, 0.05)}, ${!coloredGlow ? "#141414c1" : "#171717"} )`,
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)', 
    }

    return (<>
        {/* Desktop */}
        {(!barMode || !showMiniPlayer) &&
            <div className={styles.footer} >
                <br />
                <a href="/player" className={styles.trademark}>&copy;{new Date().getFullYear()} Eclipse Player</a>
                <label className={styles.labeled}>by George Tzachristas</label>
                <br />
            </div >
        }   

        {barMode && showMiniPlayer && !playerPage  &&
            <div className={styles.player} style={MBstyle}>
                <MiniPlayerBar />
            </div>
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