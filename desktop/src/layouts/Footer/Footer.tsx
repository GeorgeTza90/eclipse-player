import { useMiniPlayer } from '@/contexts/MiniPlayerContextWeb';
import { useAuth } from '@/contexts/AuthContextWeb.tsx';
import { useImageToast } from '@/components/ui/toasts/ImageToast';
import MiniPlayerBar from '@/components/player/mini/MiniPlayerBar';
import styles from "./footer.module.css";
import { useStylesLayout } from '@/hooks/useStylesLayout';

const Footer = () => {    
    const { user } = useAuth();    
    const { barMode, playerPage, showMiniPlayer } = useMiniPlayer();    
    const { ImageToastUI, showImageToast } = useImageToast();

    const { MBstyle } = useStylesLayout();

    return (<>
        {/* Desktop */}
        {(!barMode || !showMiniPlayer || playerPage || !user) &&
            <div className={styles.footer} >                
                <a href="/player" className={styles.trademark}>&copy;{new Date().getFullYear()} Eclipse Player</a>
                <label className={styles.labeled}>by George Tzachristas</label>
                <br />
            </div >
        }   

        {/* Mini Player Bar */}
        {barMode && showMiniPlayer && !playerPage  && user &&
            <>                
                {ImageToastUI}
                <div className={styles.player} style={MBstyle}>                    
                    <MiniPlayerBar handleImageToast={showImageToast}/>                    
                </div>
            </>            
        }       
    </>);
}

export default Footer;