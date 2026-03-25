import { useEffect, useState } from "react";
import { useAudio } from "../../contexts/AudioContextWeb";
import { formatTime } from "../../hooks/useFormatTime";
import { useImageToast } from "../../hooks/useImageToast";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useNavigate } from "react-router-dom";
import { useMiniPlayer } from "../../contexts/MiniPlayerContextWeb";
import styles from "./audioPlayer.module.css";
import Circle from "../ui/Circle";
import PlayButton from "../buttons/PlayButton";
import ArtistButton from "../buttons/ArtistButton";

export default function AudioPlayer({ onToggleExtention }) {
  const { currentSong, isPlaying, position, duration, volume, togglePlay, stop, next, previous, setVolume, seekTo } = useAudio();  
  const { coloredGlow } = useMiniPlayer();
  const { showImageToast, ImageToastUI } = useImageToast();
  
  const [extention, setExtention] = useState("Playlist");
  const [intensity, setIntensity] = useState(30);  
  const [sliderPosition, setSliderPosition] = useState(null);
  const [shadowColor, setShadowColor] = useState(currentSong?.averageColor ?? "#bebebe");

  const progress = duration ? (sliderPosition / duration) * 100 : 0;
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const handleExtention = (key) => { setExtention(key); onToggleExtention(key); };

  useEffect(() => { if (position != null) setSliderPosition(position); }, [position]);
  useEffect(() => setIntensity(volume * 30), [volume]);  
  useEffect(() => { if (!coloredGlow) setShadowColor("#bebebe"); else setShadowColor(currentSong?.averageColor); }, [coloredGlow, currentSong]);

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
    height: "5px",
    borderRadius: "3px",
    background: `linear-gradient(to right, ${shadowColor}, ${shadowColor} ${volume * 100}%, #555 ${volume * 100}%)`,
    outline: "none",
  };

  const extentionButtonsStyle = {
    width: "5rem",
    backgroundColor: "#49444400",
    cursor: "pointer",
    borderRadius: "1rem",    
    boxShadow: "#000000 1fr 1fr",    
    color: "#fff",
    borderColor: "#33333300",
  }

  const etentionHoverStyle = {
    position: "absolute",
    top: 0,
    left: `${extention === "Playlist" ? 0 : extention === "Lyrics" ? 33.5 : 66}%`,    
    width: "33%",
    height: "100%",
    backgroundColor: "#96969697",
    borderRadius: "1rem",
    zIndex: -5,
    transition: "left 0.3s ease",
  }

  return (
    <div className={styles.container}>
      {/* Circles */}
      <Circle size={isMobile ? 385 : 600} top={isMobile ? 110 : 150} intensity={isMobile ? intensity * 0.6 : intensity * 0.8} heightOffset={8} shadowColor={shadowColor} />
      <Circle size={isMobile ? 230 : 300} top={isMobile ? 550 : 800} intensity={intensity * 0.5} heightOffset={6} shadowColor={shadowColor} color2="#0e0e0eff" color1="#1b1a1aff" />

      {/* Player UI */}
      <div className={styles.playerContent}>
        {/* Info */}
        <div className={styles.infoRow}>
          {currentSong?.image &&
            <img 
              src={currentSong.image}
              alt={currentSong.title}
              className={styles.image}
              onClick={() => showImageToast(currentSong.image)}
            />}
            {ImageToastUI}
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

        {/* Volume */}
        <div className={styles.sliderRowVol}>
          <button className={styles.VolButton} onClick={() => setVolume(0)}>
            <img className={volume === 0 ? styles.volIconActive : styles.volIcon} src="/assets/icons/volMin2.png" />
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            style={volumeSliderStyle}
          />
          <button className={styles.VolButton} onClick={() => setVolume(1)}>
            <img className={volume === 1 ? styles.volIconActive : styles.volIcon} src="/assets/icons/volMax2.png" />
          </button>
        </div>

        {/* Extention Buttons */}
        <div className={styles.extentionButton} style={{ position: "relative" }}>        
          <div style={etentionHoverStyle}/>          
          {/* Buttons */}
          <button  style={{ ...extentionButtonsStyle, zIndex: 2 }} onClick={() => handleExtention("Playlist")}>Playlist</button>
          <button style={{ ...extentionButtonsStyle, zIndex: 2 }} onClick={() => handleExtention("Lyrics")}>Lyrics</button>
          <button style={{ ...extentionButtonsStyle, zIndex: 2 }} onClick={() => handleExtention("Equalizer")}>Equalizer</button>
        </div>
      </div>

      {!currentSong && (
        <div className={styles.emptyRow}>
          <p className={styles.emptyPlayer}>Player Is Empty</p>
          <p className={styles.songsAdd} onClick={() => navigate(`/library`)}>Add Songs Here</p>
        </div>   
      )}   
    </div>
  );
}
