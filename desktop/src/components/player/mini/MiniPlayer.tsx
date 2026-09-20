import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAudio } from "@/contexts/AudioContextWeb";
import { useAuth } from "@/contexts/AuthContextWeb.tsx";
import { useMiniPlayer } from "@/contexts/MiniPlayerContextWeb";
import { useShadowColor } from "@/hooks/useShadowColor";
import { useImageToast } from "@/components/ui/toasts/ImageToast";
import { useStylesSliders } from "@/hooks/useStyleSliders";
import { groupArtistsByRole } from "@/utils/groupArtistsByRole";
import Circle from "@/components/ui/circles/MiniPlayerCircle";
import MiniControls from "./parts/MiniControls";
import MiniInfoRow from "./parts/MiniInfoRow";
import MiniTimeSlider from "./parts/MiniTimeSlider";
import MiniVolumeSlider from "./parts/MiniVolumeSlider";
import styles from "./miniPlayer.module.css";

const MiniPlayer = () => {
    const { currentSong, isPlaying, position, duration, volume } = useAudio();
    const { pos, onMouseDown, showImage, showMiniPlayer, showTimeBar, showVolumeBar, transparency, showGlow, coloredGlow, goRGB } = useMiniPlayer();
    const { showImageToast, ImageToastUI } = useImageToast();
    const { user } = useAuth();
        
    const [intensity, setIntensity] = useState(30);
    const [circleParams, setCircleParams] = useState({size: 295, left: -100, top: -40})
    const [sliderPosition, setSliderPosition] = useState(0);    
    
    const shadowColor = useShadowColor(coloredGlow, currentSong, "#bebebe");
    const { mainArtists, featArtists } = groupArtistsByRole(currentSong?.artists ?? []);
    const progress = duration ? (sliderPosition / duration) * 100 : 0;

    const { sliderStyle, volumeSliderStyle, miniPlayerDiv, RGBStyle } = useStylesSliders(goRGB, coloredGlow, progress, shadowColor, intensity, volume, pos, transparency);

    /* --- UI UPDATE  --- */
    useEffect(() => {
        if (!showTimeBar && !showVolumeBar) {
            setCircleParams({ size: 250, left: -80, top: -50 });           
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
    
                <div className={styles.partsDiv}>
        {/* Info */}
                    <MiniInfoRow
                        currentSong={currentSong}
                        mainArtists={mainArtists}
                        featArtists={featArtists}
                        onClick={() => currentSong.imageHQ && showImageToast(currentSong?.imageHQ)}
                    /> 

        {/* Controls */}
                    <MiniControls size={30} isPlaying={isPlaying} />

        {/* Time Slider */}
                    {showTimeBar && (<><br/><br/>
                        <MiniTimeSlider
                            width={8}
                            goRGB={goRGB}
                            position={position}
                            duration={duration}
                            sliderPosition={sliderPosition}
                            RGBStyle={RGBStyle}
                            sliderStyle={sliderStyle}
                        />
                    </>)}

        {/* Volume */}
                    {showVolumeBar && (<><br/>
                        <MiniVolumeSlider
                            width={5}
                            goRGB={goRGB}
                            volume={volume}
                            RGBStyle={RGBStyle}
                            volumeSliderStyle={volumeSliderStyle}
                        />
                    </>)}

        {/* Link Button */}
                        <Link to="/player" className={!showVolumeBar || !showTimeBar ? styles.smallPlayerButton : styles.playerButton} />
                        {user && <Link to="/user-settings" className={!showVolumeBar || !showTimeBar ? styles.smallSettingsButton : styles.settingsButton} />}
                </div>
            </div>
        }        
    </>);
};

export default MiniPlayer;