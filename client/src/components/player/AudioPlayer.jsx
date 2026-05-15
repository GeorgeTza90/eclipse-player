import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAudio } from "../../contexts/AudioContextWeb";
import { useMiniPlayer } from "../../contexts/MiniPlayerContextWeb";
import { formatTime } from "../../hooks/useFormatTime";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useImageToast } from "../ui/toasts/ΙmageToast";
import PlayButton from "../ui/buttons/PlayButton";
import ArtistButton from "../ui/buttons/ArtistButton";
import Circle from "../ui/circles/Circle";
import styles from "./audioPlayer.module.css";

const AudioPlayer = ({ onToggleExtention }) => {
    const { currentSong, isPlaying, position, duration, volume, togglePlay, stop, next, previous, setVolume, seekTo } = useAudio();  
    const { coloredGlow, goRGB } = useMiniPlayer();
    const { showImageToast, ImageToastUI } = useImageToast();    
    
    const [extention, setExtention] = useState("Playlist");
    const [intensity, setIntensity] = useState(30);  
    const [sliderPosition, setSliderPosition] = useState(null);
    const [shadowColor, setShadowColor] = useState(currentSong?.averageColor ?? "#bebebe");

    const progress = duration ? (position / duration) * 100 : 0;
    const isMobile = useIsMobile();
    const navigate = useNavigate();

    const handleExtention = (key) => { setExtention(key); onToggleExtention(key); };

    /* --- UI UPDATE --- */
    useEffect(() => { if (position != null) setSliderPosition(position); }, [position]);
    useEffect(() => setIntensity(volume * 30), [volume]);  
    useEffect(() => { if (!coloredGlow) setShadowColor("#bebebe"); else setShadowColor(currentSong?.averageColor); }, [coloredGlow, currentSong]);

    /* --- STYLES --- */
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
    const RGBStyle = { opacity: `${intensity / 24 + 0.1}` };    
    const extentionHoverStyle = { left: `${extention === "Playlist" ? 0 : extention === "Lyrics" ? 33.5 : 66}%` }

    return (<>
        <div className={styles.container}>            
    {/* Circles */}
            <Circle size={isMobile ? 400 : 600} top={isMobile ? 110 : 150} intensity={isMobile ? intensity * 0.6 : intensity * 0.8} heightOffset={8} shadowColor={shadowColor} />
            <Circle size={isMobile ? 230 : 300} top={isMobile ? 550 : 800} intensity={intensity * 0.5} heightOffset={6} shadowColor={shadowColor} color2="#0e0e0eff" color1="#1b1a1aff" />

    {/* Player UI */}
            <div className={styles.playerContent}>
    {/* Info */}
                <div className={styles.infoRow}>
                    {currentSong?.image && <img src={currentSong.image} alt={currentSong.title} className={styles.image} onClick={() => showImageToast(currentSong.imageHQ)} />}
                    <div>
                        <h3 className={styles.title}>{currentSong?.title || "Song Title"}</h3>
                        {currentSong?.feature && (
                            <span className={styles.trackFeature}>{`feat. ${currentSong.feature}`}</span>
                        )}
                        <p className={styles.artist}>
                            <ArtistButton artist={currentSong?.artist || "Artist Name"} size="1.1rem"/>
                        </p>
                    </div>
                </div>

    {/* Controls */}
                <div className={styles.controls}>
                    <PlayButton type="previous" onClick={previous} />
                    <PlayButton type="stop" onClick={stop} />
                    <PlayButton type={isPlaying ? "pause" : "play"} onClick={togglePlay} />
                    <PlayButton type="next" onClick={next} />
                </div><br />

                {/* Time Slider */}
                <div className={styles.sliderRow}>                    
                    <span className={styles.time}>{formatTime(position * 1000)}</span>
                    {goRGB && <div style={RGBStyle} className={styles.sliderRGBStyle}></div>}
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
                

    {/* Volume */}
                <div className={styles.sliderRowVol}>
                    <button className={styles.VolButton} onClick={() => setVolume(0)}>
                        <img className={volume === 0 ? styles.volIconActive : styles.volIcon} src="/assets/icons/volMin2.png" />
                    </button>                    
                    {goRGB && <div style={RGBStyle} className={styles.slidervolumeRGBStyle}></div>}
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
                    <button className={styles.VolButton} onClick={() => setVolume(1)}>
                        <img className={volume === 1 ? styles.volIconActive : styles.volIcon} src="/assets/icons/volMax2.png" />
                    </button>
                </div>

    {/* Extention Buttons */}
                <div className={styles.extentionButton} style={{ position: "relative" }}>        
                    <div style={extentionHoverStyle} className={styles.extentionHoverStyle}/>
                    {/* Buttons */}
                    <button onClick={() => handleExtention("Playlist")} className={styles.extentionButtonsStyle}>Playlist</button>
                    <button onClick={() => handleExtention("Lyrics")} className={styles.extentionButtonsStyle}>Lyrics</button>
                    <button onClick={() => handleExtention("Equalizer")} className={styles.extentionButtonsStyle}>Equalizer</button>
                </div>
            </div>

    {/* Empty Player */}
            {!currentSong && (
                <div className={styles.emptyRow}>
                    <p className={styles.emptyPlayer}>Player Is Empty</p>
                    <p className={styles.songsAdd} onClick={() => navigate(`/library`)}>Add Songs Here</p>
                </div>   
            )}   
        </div>
        {ImageToastUI}
    </>);
}

export default AudioPlayer;