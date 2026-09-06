import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAudio } from "@/contexts/AudioContextWeb";
import { useAuth } from "@/contexts/AuthContextWeb.tsx";
import { useMiniPlayer } from "@/contexts/MiniPlayerContextWeb";
import { useShadowColor } from "@/hooks/useShadowColor";
import { formatTime } from "@/utils/formatTime.ts";
import { useImageToast } from "@/components/ui/toasts/ImageToast";
import PlayButton from "@/components/ui/buttons/PlayButton";
import VolButton from "@/components/ui/buttons/VolButton";
import ArtistButton from "@/components/ui/buttons/ArtistButton";
import Circle from "@/components/ui/circles/MiniPlayerCircle";
import styles from "./miniPlayer.module.css";
import { useStylesSliders } from "@/hooks/useStyleSliders";

const MiniPlayer = () => {
    const { currentSong, isPlaying, position, duration, volume, togglePlay, stop, next, previous, setVolume, seekTo } = useAudio();
    const { pos, onMouseDown, showImage, showMiniPlayer, showTimeBar, showVolumeBar, transparency, showGlow, coloredGlow, goRGB } = useMiniPlayer();
    const { showImageToast, ImageToastUI } = useImageToast();    
    const { user } = useAuth();    
        
    const [intensity, setIntensity] = useState(30);
    const [circleParams, setCircleParams] = useState({size: 290, left: -100, top: -40})
    const [sliderPosition, setSliderPosition] = useState(0);    
    
    const shadowColor = useShadowColor(coloredGlow, currentSong, "#bebebe");
    const progress = duration ? (sliderPosition / duration) * 100 : 0;

    const { sliderStyle, volumeSliderStyle, miniPlayerDiv, RGBStyle } = useStylesSliders(goRGB, coloredGlow, progress, shadowColor, intensity, volume, pos, transparency);

    /* --- UI UPDATE  --- */
    useEffect(() => {
        if (!showTimeBar && !showVolumeBar) {
            setCircleParams({ size: 260, left: -80, top: -50 });
            if (!showImage) setCircleParams({ size: 235, left: -70, top: -50 });
        } else setCircleParams({ size: 290, left: -100, top: -40 });
    }, [showVolumeBar, showTimeBar, showImage]);    
    
    useEffect(() => { setIntensity(volume * 30); }, [volume]);
    useEffect(() => { if (position != null) setSliderPosition(position); }, [position]);        

    if (!currentSong) return null;

    return (<>
        {ImageToastUI}
        {showMiniPlayer &&
            <div
                onMouseDown={onMouseDown}         
                onTouchStart={(e) => onMouseDown(e.touches[0])}
                onTouchMove={(e) => { e.preventDefault(); }}                
                style={miniPlayerDiv}
                className={styles.container}
            >
                <Circle size={circleParams.size} intensity={intensity * 0.8} heightOffset={6} shadowColor={showGlow ? shadowColor : "#000000ff"} left={circleParams.left} top={circleParams.top} />

    {/* Info */}
                <div>
                    <div className={styles.infoRow}>
                        {currentSong?.image && showImage &&
                            <img src={currentSong.image} alt={currentSong.title} className={styles.image} onClick={(e) => { e.stopPropagation(); currentSong.imageHQ && showImageToast(currentSong.imageHQ) }} />}                            
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
                            {goRGB && <div style={RGBStyle} className={styles.sliderRGBStyle}></div>}
                            <input
                                type="range"
                                min={0}
                                max={duration || 0}
                                step="0.1"
                                value={sliderPosition ?? 0}
                                onChange={(e) => { e.stopPropagation(); seekTo(Number(e.target.value)); }}
                                style={sliderStyle}
                                className={styles.sliderStyle}
                            />
                            <span className={styles.time}>{formatTime(duration * 1000)}</span>
                        </div>
                    }

    {/* Volume */}
                    {showVolumeBar &&
                        <div className={styles.sliderRow}>
                            <VolButton type="Min" onClick={() => setVolume(0)} active={volume === 0 && true} />
                            {goRGB && <div style={RGBStyle} className={styles.slidervolumeRGBStyle}></div>}
                            <input
                                type="range"
                                min={0}
                                max={1}
                                step="0.01"
                                value={volume}
                                onChange={(e) => { e.stopPropagation(); setVolume(Number(e.target.value)); }}
                                style={volumeSliderStyle}
                                className={styles.volumeSliderStyle}
                            />
                            <VolButton type="Max" onClick={() => setVolume(1)} active={volume === 1 && true} />
                        </div>
                    }

    {/* Link Button */}                    
                        <Link to="/player" className={!showVolumeBar || !showTimeBar ? styles.smallPlayerButton : styles.playerButton} />
                        {user && <Link to="/user-settings" className={!showVolumeBar || !showTimeBar ? styles.smallSettingsButton : styles.settingsButton} />}
                </div>
            </div>
        }
    </>);
};

export default MiniPlayer;