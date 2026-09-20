import { useEffect, useState } from "react";
import { useAudio } from "@/contexts/AudioContextWeb";
import { useMiniPlayer } from "@/contexts/MiniPlayerContextWeb";
import { useShadowColor } from "@/hooks/useShadowColor";
import { useIsMobile } from "@/hooks/useIsMobile";
import { groupArtistsByRole } from "@/utils/groupArtistsByRole";
import { useImageToast } from "@/components/ui/toasts/ImageToast";
import { useStylesPlayer } from "@/hooks/useStylesPlayer";
import { AudioPlayerProps, Extention } from "@/types/player.types";
import Circle from "@/components/ui/circles/Circle";
import Controls from "./parts/Controls";
import InfoRow from "./parts/InfoRow";
import TimeSlider from "./parts/TimeSlider";

import ExtentionButtons from "./parts/ExtentionButtons";
import EmptyPlayer from "./parts/EmptyPlayer";
import styles from "./audioPlayer.module.css";
import VolumeSlider from "./parts/VolumeSlider";

const AudioPlayer = ({ onToggleExtention }: AudioPlayerProps) => {
    const { currentSong, position, duration, volume } = useAudio();
    const { coloredGlow, goRGB } = useMiniPlayer();
    const { showImageToast, ImageToastUI } = useImageToast();
    
    const [extention, setExtention] = useState<Extention>("Playlist");
    const [intensity, setIntensity] = useState(30);  
    const [sliderPosition, setSliderPosition] = useState<number | null>(null);
    
    const shadowColor = useShadowColor(coloredGlow, currentSong, "#bebebe");
    const { mainArtists, featArtists } = groupArtistsByRole(currentSong?.artists ?? []);
    const progress = duration ? (position / duration) * 100 : 0;
    const isMobile = useIsMobile();    

    const handleExtention = (key: Extention): void => {
        setExtention(key);
        onToggleExtention(key);
    };
    
    const { sliderStyle, volumeSliderStyle, RGBStyle, extentionHoverStyle } = useStylesPlayer(goRGB, coloredGlow, progress, shadowColor, volume, intensity, extention);

    /* --- UI UPDATE --- */
    useEffect(() => { if (position != null) setSliderPosition(position); }, [position]);
    useEffect(() => setIntensity(volume * 30), [volume]);    

    return (<>
        <div className={styles.container}>
    {/* Circles */}
            <Circle size={isMobile ? 400 : 600} top={isMobile ? 110 : 150} intensity={isMobile ? intensity * 0.6 : intensity * 0.8} heightOffset={8} shadowColor={shadowColor} />
            <Circle size={isMobile ? 230 : 300} top={isMobile ? 550 : 800} intensity={intensity * 0.5} heightOffset={6} shadowColor={shadowColor} color2="#0e0e0eff" color1="#1b1a1aff" />

    {/* Player UI */}
            <div className={styles.playerContent}>
        {/* Info */}
                <InfoRow
                    currentSong={currentSong}
                    featArtists={featArtists}
                    mainArtists={mainArtists}
                    onClick={() => currentSong?.imageHQ && showImageToast(currentSong.imageHQ)}
                />

        {/* Controls */}
                <Controls /><br/>

        {/* Time Slider */}
                <TimeSlider
                    position={position}
                    goRGB={goRGB}
                    duration={duration}
                    sliderPosition={sliderPosition}                    
                    RGBStyle={RGBStyle}
                    sliderStyle={sliderStyle}
                />                

        {/* Volume */}
                <VolumeSlider
                    volume={volume}
                    goRGB={goRGB}
                    RGBStyle={RGBStyle}
                    volumeSliderStyle={volumeSliderStyle}
                />                

        {/* Extention Buttons */}
                <ExtentionButtons
                    extentionHoverStyle={extentionHoverStyle}
                    onPlaylist={() => handleExtention("Playlist")}
                    onLyrics={() => handleExtention("Lyrics")}
                    onEqualizer={() => handleExtention("Equalizer")}
                />
            </div>

    {/* Empty Player */}
            {!currentSong && <EmptyPlayer />}
            
        </div>
        {ImageToastUI}
    </>);
}

export default AudioPlayer;