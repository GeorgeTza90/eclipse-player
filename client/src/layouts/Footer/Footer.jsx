import { Link } from 'react-router-dom';
import styles from "./footer.module.css"
import { useMiniPlayer } from '../../contexts/MiniPlayerContextWeb';
import MiniPlayerBar from '../../components/player/MiniPlayerBar';

function Footer() {
    const { barMode, playerPage, showMiniPlayer } = useMiniPlayer();    

    return (<>
        {/* Desktop */}
        <div className={styles.footer} >
            <br />
            <a href="/player" className={styles.trademark}>&copy;{new Date().getFullYear()} Eclipse Player</a>
            <label className={styles.labeled}>by George Tzachristas</label>
            <br />
        </div >

        {barMode && !playerPage && showMiniPlayer &&
            <div className={styles.player} >
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