import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAudio } from "../../contexts/AudioContextWeb";
import { useMiniPlayer } from "../../contexts/MiniPlayerContextWeb";
import { useImageToast } from "../ui/ΙmageToast";
import { formatTime } from "../../hooks/useFormatTime";
import Circle from "../ui/MiniPlayerCircle";
import PlayButton from "../buttons/PlayButton";
import styles from "./miniPlayer.module.css";
import VolButton from "../buttons/VolButton";
import ArtistButton from "../buttons/ArtistButton";

const MiniPlayer = () => {
    const { currentSong, isPlaying, position, duration, volume, togglePlay, stop, next, previous, setVolume, seekTo } = useAudio();
    const { pos, onMouseDown, onMouseMove, onMouseUp, showImage, showMiniPlayer, showTimeBar, showVolumeBar, transparency, showGlow, coloredGlow } = useMiniPlayer();        
    const { showImageToast, ImageToastUI } = useImageToast();    

    if (!currentSong) return null;
        
    const [intensity, setIntensity] = useState(30);
    const [circleParams, setCircleParams] = useState({size: 290, left: -100, top: -40})
    const [sliderPosition, setSliderPosition] = useState(null);
    const [shadowColor, setShadowColor] = useState(currentSong?.averageColor ?? "#bebebe");    
    
    const progress = duration ? (sliderPosition / duration) * 100 : 0;

    useEffect(() => {
        if (!showTimeBar && !showVolumeBar) {
            setCircleParams({ size: 260, left: -80, top: -50 });
            if (!showImage)  setCircleParams({ size: 235, left: -70, top: -50 });
        } else setCircleParams({ size: 290, left: -100, top: -40 });
    }, [showVolumeBar, showTimeBar, showImage]);
    
    useEffect(() => { setIntensity(volume * 30); }, [volume]);
    useEffect(() => { if (position != null) setSliderPosition(position); }, [position]);
    useEffect(() => { if (!coloredGlow) setShadowColor("#bebebe"); else setShadowColor(currentSong?.averageColor); }, [coloredGlow, currentSong]);

    const miniPlayerDiv = {
        position: "fixed",
        left: pos.x,
        top: pos.y,
        width: 100,
        height: 100,
        cursor: "grab",
        opacity: transparency ? 0.7 : 1,
    };

    const sliderStyle = {
        flex: 1,        
        WebkitAppearance: "none",
        width: "12rem",
        height: "5px",
        borderRadius: "3px",
        background: `linear-gradient(to right, ${shadowColor} ${progress}%, #555 ${progress}%)`,
        outline: "none",        
    };

    const volumeSliderStyle = {
        flex: 1,
        WebkitAppearance: "none",
        marginTop: "-1rem",
        width: "6rem",
        height: "5px",
        borderRadius: "3px",
        background: `linear-gradient(to right, ${shadowColor}, ${shadowColor} ${volume * 100}%, #555 ${volume * 100}%)`,
        outline: "none",
    };    

    return (
        <>
            {ImageToastUI}
            {showMiniPlayer &&
                <div
                    onMouseDown={onMouseDown}
                    onMouseMove={onMouseMove}
                    onMouseUp={onMouseUp}
                    onTouchStart={(e) => onMouseDown(e.touches[0])}
                    onTouchMove={(e) => { e.preventDefault(); onMouseMove(e.touches[0]); }}
                    onTouchEnd={onMouseUp}
                    style={miniPlayerDiv}
                >
                    <Circle size={circleParams.size} intensity={intensity * 0.8} heightOffset={6} shadowColor={showGlow ? shadowColor : "#000000ff"} left={circleParams.left} top={circleParams.top} />

                    {/* Info */}
                    <div className={styles.container}>
                        <div className={styles.infoRow}>
                            {currentSong?.image && showImage &&
                                <img
                                    src={currentSong.image}
                                    alt={currentSong.title}
                                    className={styles.image}
                                    onClick={(e) => { e.stopPropagation(); showImageToast(currentSong.image) }}
                                />}                            
                            <div>
                                <h3 className={styles.title}>{currentSong?.title || "Song Title"}</h3>
                                {currentSong.feature && (
                                    <div className={styles.tickerContainer}>
                                        <div className={styles.tickerText}>{`(feat. ${currentSong.feature})`}</div>
                                    </div>
                                )}
                                <ArtistButton artist={currentSong?.artist || "Artist Name"} size="0.8rem" />
                            </div>
                        </div>

                        {/* Controls */}
                        <div className={styles.controls}>
                            <PlayButton type="previous" onClick={previous} size="32px"/>
                            <PlayButton type="stop" onClick={stop} size="32px" />
                            <PlayButton type={isPlaying ? "pause" : "play"} onClick={togglePlay} size="32px" />
                            <PlayButton type="next" onClick={next} size="32px" />
                        </div>


                        {/* Time Slider */}
                        {showTimeBar &&
                            <div className={styles.sliderRow}>
                                <span className={styles.time}>{formatTime(position * 1000)}</span>
                                <input
                                    type="range"
                                    min={0}
                                    max={duration || 0}
                                    step="0.1"
                                    value={sliderPosition ?? 0}
                                    onChange={(e) => { e.stopPropagation(); seekTo(Number(e.target.value)); }}
                                    style={sliderStyle}
                                />
                                <span className={styles.time}>{formatTime(duration * 1000)}</span>
                            </div>
                        }

                        {/* Volume */}
                        {showVolumeBar &&
                            <div className={styles.sliderRow}>
                                <VolButton type="Min" onClick={() => setVolume(0)} active={volume === 0 && true} />
                                <input
                                    type="range"
                                    min={0}
                                    max={1}
                                    step="0.01"
                                    value={volume}
                                    onChange={(e) => { e.stopPropagation(); setVolume(Number(e.target.value)); }}
                                    style={volumeSliderStyle}
                                />
                                <VolButton type="Max" onClick={() => setVolume(1)} active={volume === 1 && true} />
                            </div>
                        }
                        <Link to="/player" className={!showVolumeBar || !showTimeBar ? styles.smallPlayerButton : styles.playerButton} />
                    </div>
                </div>
            }
        </>
    );
};

export default MiniPlayer;