import { useNavigate } from "react-router-dom";
import { SongStatsButtonProps } from "@/types/ui.types";
import styles from "./showSongStatsButton.module.css"

export const ShowSongStatsButton = ({song}: SongStatsButtonProps) => {
    const navigate = useNavigate();    

    return (<>
        <button
            className={styles.statsButton}
            onClick={(e) => {
                e.stopPropagation();
                navigate(`/stats/song?songId=${song.id}&range=${"1m"}`);
            }}
        >
            <img src="/assets/icons/stats.png" className={styles.icon}/>
        </button>
    </>);
}

export default ShowSongStatsButton;