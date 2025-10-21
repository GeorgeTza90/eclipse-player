import { Link } from 'react-router-dom';
import styles from "./nav.module.css";

function Nav() {
    return (
        <>
            <div className={styles.nav}>
                {/* Desktop */}
                <div className={styles.desktopOnly}>
                    <div className={styles.all}>
                        <Link to="/" className={styles.homeLogo} />
                        <Link to="/player" className={styles.playerLogo} />
                        <Link to="/library" className={styles.libraryLogo} />
                    </div>
                </div>

                {/* Mobile */}
                <div className={styles.mobileOnly}>
                    <div className={styles.all} >
                        <Link to="/" className={styles.homeLogo} />
                        <Link to="/player" className={styles.playerLogo} />
                        <Link to="/library" className={styles.libraryLogo} />
                    </div>
                </div >
            </div>
        </>
    );
}

export default Nav;