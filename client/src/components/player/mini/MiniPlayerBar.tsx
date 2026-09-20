import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMiniPlayer } from "@/contexts/MiniPlayerContextWeb";
import { useAudio } from "@/contexts/AudioContextWeb";
import { useAuth } from "@/contexts/AuthContextWeb.tsx";
import { useShadowColor } from "@/hooks/useShadowColor";
import { MiniPlayerBarProps } from "@/types/player.types";
import { useStylesSliders } from "@/hooks/useStyleSliders";
import { groupArtistsByRole } from "@/utils/groupArtistsByRole";
import MiniControls from "./parts/MiniControls";
import MiniInfoRow from "./parts/MiniInfoRow";
import MiniTimeSlider from "./parts/MiniTimeSlider";
import VerticalLine from "@/components/ui/lines/VerticalLine";
import styles from "./miniPlayerBar.module.css";
import MiniVolumeSlider from "./parts/MiniVolumeSlider";

const MiniPlayerBar = ({handleImageToast}: MiniPlayerBarProps) => {
    const { currentSong, isPlaying, position, duration, volume } = useAudio();
    const { pos, transparency, showMiniPlayer, coloredGlow, goRGB } = useMiniPlayer();
    const { user } = useAuth();    
   
    const [intensity, setIntensity] = useState(30);
    const [sliderPosition, setSliderPosition] = useState(0);

    const shadowColor = useShadowColor(coloredGlow, currentSong, "#bebebe");
    const { mainArtists, featArtists } = groupArtistsByRole(currentSong?.artists ?? []);
    const progress = duration ? (sliderPosition / duration) * 100 : 0;

    const { sliderStyle, volumeSliderStyle, rgbStyleslider, rgbStyleBG } = useStylesSliders(goRGB, coloredGlow, progress, shadowColor, intensity, volume, pos, transparency);
   
    /* --- UI UPDATE  --- */
    useEffect(() => { setIntensity(volume * 30); }, [volume]);
    useEffect(() => { if (position != null) setSliderPosition(position); }, [position]);
    
    if (!currentSong) return null;    

    return (<>          
        {showMiniPlayer &&
            <div>                
                <div className={styles.container}>
                    {goRGB && coloredGlow && <div style={rgbStyleBG} className={styles.rgbStyleBG} />}
        {/* Info */}
                    <MiniInfoRow
                        currentSong={currentSong}
                        mainArtists={mainArtists}
                        featArtists={featArtists}
                        onClick={() => currentSong.imageHQ && handleImageToast(currentSong?.imageHQ)}
                    />                    
                    <VerticalLine />

        {/* Controls */}
                    <MiniControls size={28} isPlaying={isPlaying} />
                    <VerticalLine />


        {/* Time Slider */}
                    <MiniTimeSlider
                        width={8.1}
                        goRGB={goRGB}
                        position={position}
                        duration={duration}
                        sliderPosition={sliderPosition}
                        RGBStyle={rgbStyleslider}
                        sliderStyle={sliderStyle}
                    />
                    <VerticalLine />                    
                    
        {/* Volume */}
                    <MiniVolumeSlider
                        width={5}
                        goRGB={goRGB}
                        volume={volume}
                        RGBStyle={rgbStyleslider}
                        volumeSliderStyle={volumeSliderStyle}
                    />
                    <VerticalLine />            

        {/* Link Button */}
                    <Link to="/player" className={styles.playerButton} />
                    {user && <Link to="/user-settings" className={styles.settingsButton} />}
                </div>
            </div>
        }
    </>);
};

export default MiniPlayerBar;