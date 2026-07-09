import { useState } from "react";
import { useStylesToast } from "../../../hooks/useStylesToast";

export const useImageToast = () => {
    const [toastImage, setToastImage] = useState(null);
    const [visible, setVisible] = useState(false);
    const { overlayStyle, imageWrapperStyle, imageStyle } = useStylesToast();

    const showImageToast = (imageUrl) => {
        setToastImage(imageUrl);
        setVisible(true);    
    };

    const ImageToastUI = toastImage && visible && (
        <div style={overlayStyle} onClick={() => setVisible(false)}>
            <div style={imageWrapperStyle}>
                <img src={toastImage} alt="" style={imageStyle} />
            </div>
        </div>
    );

    return { showImageToast, ImageToastUI };
};