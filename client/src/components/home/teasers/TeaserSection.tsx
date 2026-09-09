import Teaser from "@/components/ui/teasers/Teaser";
import styles from "./teaserSection.module.css"
import { API_URL, CURRENT_APK_VERSION, CURRENT_DESKTOP_VERSION } from "@/config";

const TeaserSection = () => {

    return(
        <div className={styles.teaseDiv}>
            {/* <Teaser 
                link={`/library/CollectionDetail/${encodeURIComponent("No Gods In Heaven")}`} 
                source={"/assets/vids/Video Teaser 2.mp4"}
                video={true}
            /> */}
            <Teaser
                link = {`${API_URL}/api/download/apk?version=${CURRENT_APK_VERSION}`}
                source={"/assets/images/App_Teaser_1.jpg"}
                download
                video={false}
            />
            <Teaser
                link = {`${API_URL}/api/download/desktop?version=${CURRENT_DESKTOP_VERSION}`}
                source={"/assets/images/App_Teaser_2.jpg"}
                download
                video={false}
            />
        </div>
    );
}

export default TeaserSection;