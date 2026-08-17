import { useNavigate } from "react-router-dom";
import type { ArtistButtonProps } from "@/types/button.types";
import styles from "./artistButton.module.css";

const ArtistButton = ({ artist, size = "1rem", marginTop = "0.28rem" }: ArtistButtonProps) => {
    const navigate = useNavigate();

    const buttonStyle = { fontSize: size, marginTop: marginTop }
    
    return ( 
        <button            
            style={buttonStyle}
            className={styles.artirtButton}
            onClick={() => artist && navigate(`/library/ArtistInfo/${encodeURIComponent(artist)}`)}
        >
            {artist || "Artist Name"}
        </button>        
    );
}

export default ArtistButton;