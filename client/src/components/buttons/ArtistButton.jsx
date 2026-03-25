import { useNavigate } from "react-router-dom";
import styles from "./artistButton.module.css";

export default function ArtistButton({ artist, size = "1rem", marginTop = "0.28rem" }) {
    const navigate = useNavigate();

    const buttonStyle = { fontSize: size, marginTop: marginTop }
    
    return ( 
        <button
            style={buttonStyle}
            className={styles.artirtButton}
            onClick={() => artist && navigate(`/library/ArtistInfo?artist=${encodeURIComponent(artist)}`)}
        >
            {artist || "Artist Name"}
        </button>        
    );
}
