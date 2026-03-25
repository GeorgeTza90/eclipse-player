import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAudio } from "../../contexts/AudioContextWeb";
import { formatTime } from "../../hooks/useFormatTime";
import { useImageToast } from "../../hooks/useImageToast";
import { useNavigate } from "react-router-dom";
import { useMiniPlayer } from "../../contexts/MiniPlayerContextWeb";
import PlayButton from "../buttons/PlayButton";
import styles from "./miniPlayerBar.module.css";
import VolButton from "../buttons/VolButton";
import ArtistButton from "../buttons/ArtistButton";

const MiniPlayerBar = () => {
    const { currentSong, isPlaying, position, duration, volume, togglePlay, stop, next, previous, setVolume, seekTo } = useAudio();
    const { showImage, showMiniPlayer, showTimeBar, showVolumeBar, coloredGlow } = useMiniPlayer();    
    const { showImageToast, ImageToastUI } = useImageToast();
    const navigate = useNavigate();

    if (!currentSong) return null;
   
    const [sliderPosition, setSliderPosition] = useState(null);
    const [shadowColor, setShadowColor] = useState(currentSong?.averageColor ?? "#bebebe");
    
    const progress = duration ? (sliderPosition / duration) * 100 : 0;
   
    useEffect(() => { if (position != null) setSliderPosition(position); }, [position]);
    useEffect(() => { if (!coloredGlow) setShadowColor("#bebebe"); else setShadowColor(currentSong?.averageColor); }, [coloredGlow, currentSong]);

    const sliderStyle = {
        flex: 1,
        WebkitAppearance: "none",
        width: "10rem",
        height: "5px",
        borderRadius: "3px",
        background: `linear-gradient(to right, ${shadowColor} ${progress}%, #555 ${progress}%)`,
        outline: "none",
    };

    const volumeSliderStyle = {
        flex: 1,
        WebkitAppearance: "none",
        marginTop: "-0.85rem",
        width: "6rem",
        height: "4.5px",
        borderRadius: "3px",
        background: `linear-gradient(to right, ${shadowColor}, ${shadowColor} ${volume * 100}%, #555 ${volume * 100}%)`,
        outline: "none",
    };

    return (
        <>
            {ImageToastUI}
            {showMiniPlayer &&
                <div>
                    {/* Info */}
                    <div className={styles.container}>
                        <div className={styles.infoRow}>
                            {currentSong?.image && showImage && 
                                <img
                                    src={currentSong.image}
                                    alt={currentSong.title}
                                    className={styles.image}
                                    onClick={() => showImageToast(currentSong.image)}
                                />}                                
                            <div>
                                <h3 className={styles.title}>{currentSong?.title || "Song Title"}</h3>
                                {currentSong.feature && (
                                    <div className={styles.tickerContainer}>
                                        <div className={styles.tickerText}>{`(feat. ${currentSong.feature})`}</div>
                                    </div>
                                )}
                                <ArtistButton artist={currentSong?.artist || "Artist Name"} size="0.8rem" marginTop = "0rem" />                                
                            </div>
                        </div>
                        <hr className={styles.line}/>

                        {/* Controls */}
                        <div className={styles.controls}>
                            <PlayButton type="previous" onClick={previous} size="32px"/>
                            <PlayButton type="stop" onClick={stop} size="32px"/>
                            <PlayButton type={isPlaying ? "pause" : "play"} onClick={togglePlay} size="32px"/>
                            <PlayButton type="next" onClick={next} size="32px"/>
                        </div>
                        <hr className={styles.line}/>


                        {/* Time Slider */}
                        {showTimeBar &&
                            <>
                                <div className={styles.sliderRow}>
                                    <span className={styles.time}>{formatTime(position * 1000)}</span>
                                    <input
                                        type="range"
                                        min={0}
                                        max={duration || 0}
                                        step="0.1"
                                        value={sliderPosition ?? 0}
                                        onChange={(e) => seekTo(Number(e.target.value))}
                                        style={sliderStyle}
                                    />
                                    <span className={styles.time}>{formatTime(duration * 1000)}</span>
                                </div>
                                <hr className={styles.line}/>
                            </>
                        }
                        
                        {/* Volume */}
                        {showVolumeBar &&
                            <div className={styles.sliderRowVol}>
                                <VolButton type="Min" onClick={() => setVolume(0)} active={volume === 0 && true} />
                                <input
                                    type="range"
                                    min={0}
                                    max={1}
                                    step="0.01"
                                    value={volume}
                                    onChange={(e) => setVolume(Number(e.target.value))}
                                    style={volumeSliderStyle}
                                />
                                <VolButton type="Max" onClick={() => setVolume(1)} active={volume === 1 && true} />
                            </div>
                        }
                        <hr className={styles.line}/>
                        
                        <Link to="/player" className={!showVolumeBar || !showTimeBar || !showImage ? styles.smallPlayerButton : styles.playerButton} />
                    </div>
                </div>
            }
        </>
    );
};

export default MiniPlayerBar;