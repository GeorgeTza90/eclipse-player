import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAudio } from "../../contexts/AudioContextWeb";
import Circle from "../ui/MiniPlayerCircle";
import PlayButton from "../buttons/PlayButton";
import { formatTime } from "../../hooks/useFormatTime";
import styles from "./miniPlayer.module.css";
import { useMiniPlayer } from "../../contexts/MiniPlayerContextWeb";
import VolButton from "../buttons/VolButton";

const MiniPlayer = () => {
    const {
        currentSong, isPlaying, position, duration, volume, togglePlay,
        stop, next, previous, setVolume, seekTo
    } = useAudio();

    const {
        pos, onMouseDown, onMouseMove, onMouseUp, showImage, showMiniPlayer,
        showTimeBar, showVolumeBar, transparency, showGlow,
    } = useMiniPlayer();

    if (!currentSong) return null;

    const shadowColor = currentSong?.averageColor ?? "#bebebe";
    const [intensity, setIntensity] = useState(30);
    const [circleSize, setCircleSize] = useState(300);
    const [circleLeft, setCircleLeft] = useState(-100);
    const [circleTop, setCircleTop] = useState(-40);
    const [sliderPosition, setSliderPosition] = useState(null);
    const progress = duration ? (sliderPosition / duration) * 100 : 0;

    useEffect(() => {
        if (!showTimeBar && !showVolumeBar) {
            setCircleSize(250);
            setCircleLeft(-80);
            setCircleTop(-50);

            if (!showImage) {
                setCircleSize(220);
                setCircleLeft(-60);
                setCircleTop(-60);
            };

        } else {
            setCircleSize(300)
            setCircleLeft(-100);
            setCircleTop(-40)
        }
    }, [showVolumeBar, showTimeBar, showImage]);

    useEffect(() => {
        if (position != null) {
            setSliderPosition(position);
        }
    }, [position]);

    useEffect(() => {
        setIntensity(volume * 30);
    }, [volume]);

    const sliderStyle = {
        flex: 1,
        WebkitAppearance: "none",
        height: "6px",
        borderRadius: "3px",
        background: `linear-gradient(to right, ${shadowColor} ${progress}%, #555 ${progress}%)`,
        outline: "none",
    };

    const volumeSliderStyle = {
        flex: 1,
        WebkitAppearance: "none",
        marginTop: "-1rem",
        width: "7rem",
        height: "5px",
        borderRadius: "3px",
        background: `linear-gradient(to right, ${shadowColor}, ${shadowColor} ${volume * 100}%, #555 ${volume * 100}%)`,
        outline: "none",
    };

    return (
        <>
            {showMiniPlayer &&
                <div
                    onMouseDown={onMouseDown}
                    onMouseMove={onMouseMove}
                    onMouseUp={onMouseUp}
                    onTouchStart={(e) => onMouseDown(e.touches[0])}
                    onTouchMove={(e) => {
                        e.preventDefault();
                        onMouseMove(e.touches[0]);
                    }}
                    onTouchEnd={onMouseUp}
                    style={{
                        position: "fixed",
                        left: pos.x,
                        top: pos.y,
                        width: 100,
                        height: 100,
                        cursor: "grab",
                        opacity: transparency ? 0.7 : 1,
                    }}
                >
                    <Circle size={circleSize} intensity={intensity * 0.4} heightOffset={6} shadowColor={showGlow ? shadowColor : "#000000ff"} left={circleLeft} top={circleTop} />

                    {/* Info */}
                    <div className={styles.container}>
                        <div className={styles.infoRow}>
                            {currentSong?.image && showImage && <img src={currentSong.image} alt={currentSong.title} className={styles.image} />}
                            <div>
                                <h3 className={styles.title}>{currentSong?.title || "Song Title"}</h3>
                                {currentSong.feature && (
                                    <div className={styles.tickerContainer}>
                                        <div className={styles.tickerText}>
                                            {`(feat. ${currentSong.feature})`}
                                        </div>
                                    </div>
                                )}
                                <p className={styles.artist}>{currentSong?.artist || "Artist Name"}</p>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className={styles.controls}>
                            <PlayButton type="previous" onClick={previous} />
                            <PlayButton type="stop" onClick={stop} />
                            <PlayButton type={isPlaying ? "pause" : "play"} onClick={togglePlay} />
                            <PlayButton type="next" onClick={next} />
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
                                    onChange={(e) => seekTo(Number(e.target.value))}
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
                                    onChange={(e) => setVolume(Number(e.target.value))}
                                    style={volumeSliderStyle}
                                />
                                <VolButton type="Max" onClick={() => setVolume(1)} active={volume === 1 && true} />
                            </div>
                        }
                        <Link to="/player" className={!showVolumeBar || !showTimeBar || !showImage ? styles.smallPlayerButton : styles.playerButton} />
                    </div>
                </div>
            }
        </>
    );
};

export default MiniPlayer;