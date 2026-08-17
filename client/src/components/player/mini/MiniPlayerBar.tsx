import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMiniPlayer } from "@/contexts/MiniPlayerContextWeb";
import { useAudio } from "@/contexts/AudioContextWeb";
import { useAuth } from "@/contexts/AuthContextWeb.tsx";
import { useShadowColor } from "@/hooks/useShadowColor";
import { formatTime } from "@/utils/formatTime.ts";
import PlayButton from "@/components/ui/buttons/PlayButton";
import VolButton from "@/components/ui/buttons/VolButton";
import ArtistButton from "@/components/ui/buttons/ArtistButton";
import styles from "./miniPlayerBar.module.css";
import { MiniPlayerBarProps } from "@/types/miniPlayer.types";

const MiniPlayerBar = ({handleImageToast}: MiniPlayerBarProps) => {
    const { currentSong, isPlaying, position, duration, volume, togglePlay, stop, next, previous, setVolume, seekTo } = useAudio();
    const { showImage, showMiniPlayer, showTimeBar, showVolumeBar, coloredGlow, goRGB } = useMiniPlayer();
    const { user } = useAuth();    
   
    const [intensity, setIntensity] = useState(30);
    const [sliderPosition, setSliderPosition] = useState(0);

    const shadowColor = useShadowColor(coloredGlow, currentSong, "#bebebe");
    const progress = duration ? (sliderPosition / duration) * 100 : 0;
   
    /* --- UI UPDATE  --- */
    useEffect(() => { setIntensity(volume * 30); }, [volume]);
    useEffect(() => { if (position != null) setSliderPosition(position); }, [position]);
    
    if (!currentSong) return null;

    /* --- STYLES  --- */
    const sliderStyle = {
        background: goRGB && coloredGlow 
            ? `linear-gradient(to right, #acacac ${progress}%, #55555572 ${progress}%)`
            : `linear-gradient(to right, ${shadowColor} ${progress}%, #555 ${progress}%)`,
    };
    const volumeSliderStyle = {
        background: goRGB && coloredGlow 
            ? `linear-gradient(to right, #acacac, #acacac ${volume * 100}%, #55555572 ${volume * 100}%)`
            : `linear-gradient(to right, ${shadowColor}, ${shadowColor} ${volume * 100}%, #555 ${volume * 100}%)`,     
    };
    const rgbStyleslider = { opacity: `${intensity / 24 + 0.1}` };
    const rgbStyleBG = { opacity: `${intensity / 800 + 0.02}` };

    return (<>          
        {showMiniPlayer &&
            <div>
                {goRGB && <div style={rgbStyleBG} className={styles.rgbStyleBG} />}                    
                <div className={styles.container}>
    {/* Info */}
                    <div className={styles.infoRow}>
                        {currentSong?.image && 
                            <img src={currentSong.image} alt={currentSong.title} className={styles.image} onClick={() => currentSong.imageHQ && handleImageToast(currentSong?.imageHQ)} />}                                
                        <div>
                            <div className={styles.tickerContainer}>
                                <h3 className={currentSong.title.length < 20 ? `${styles.title}` : `${styles.tittleTicker}`}>{currentSong?.title || "Song Title"}</h3>
                            </div>
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
                        <PlayButton type="previous" onClick={previous} size="28px"/>
                        <PlayButton type="stop" onClick={stop} size="28px"/>
                        <PlayButton type={isPlaying ? "pause" : "play"} onClick={togglePlay} size="28px"/>
                        <PlayButton type="next" onClick={next} size="28px"/>
                    </div>
                    <hr className={styles.line}/>


    {/* Time Slider */}                  
                    <div className={styles.sliderRow}>
                        <span className={styles.time}>{formatTime(position * 1000)}</span>
                        {goRGB && <div style={rgbStyleslider} className={styles.sliderRGBStyle}></div>}
                        <input
                            type="range"
                            min={0}
                            max={duration || 0}
                            step="0.1"
                            value={sliderPosition ?? 0}
                            onChange={(e) => seekTo(Number(e.target.value))}
                            style={sliderStyle}
                            className={styles.sliderStyle}
                        />
                        <span className={styles.time}>{formatTime(duration * 1000)}</span>
                    </div>
                    <hr className={styles.line}/>                                
                    
    {/* Volume */}
                    <div className={styles.sliderRowVol}>
                        <VolButton type="Min" onClick={() => setVolume(0)} active={volume === 0 && true} />
                        {goRGB && <div style={rgbStyleslider} className={styles.slidervolumeRGBStyle}></div>}
                        <input
                            type="range"
                            min={0}
                            max={1}
                            step="0.01"
                            value={volume}
                            onChange={(e) => setVolume(Number(e.target.value))}
                            style={volumeSliderStyle}
                            className={styles.volumeSliderStyle}
                        />
                        <VolButton type="Max" onClick={() => setVolume(1)} active={volume === 1 && true} />
                    </div>
                    <hr className={styles.line}/>                         

    {/* Link Button */}
                    <Link to="/player" className={styles.playerButton} />
                    {user && <Link to="/user-settings" className={styles.settingsButton} />}
                </div>
            </div>
        }
    </>);
};

export default MiniPlayerBar;