import { Link } from 'react-router-dom';
import styles from "./footer.module.css"

function Footer() {

    return (<>
        {/* Desktop */}
        < div className={styles.footer} >
            <br />
            <a href="/player" className={styles.trademark}>&copy;{new Date().getFullYear()} Eclipse Player</a>
            <label className={styles.labeled}>by George Tzachristas</label>
            <br />
        </div >


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