import { useState } from "react";

export const useImageToast = () => {
  const [toastImage, setToastImage] = useState(null);
  const [visible, setVisible] = useState(false);

  const showImageToast = (imageUrl) => {
    setToastImage(imageUrl);
    setVisible(true);    
  };

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0, 0, 0, 0.43)",
    backdropFilter: "blur(2px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 99999,
    cursor: "pointer",
  };

  const imageWrapperStyle = {
    borderRadius: "0.2rem",
    overflow: "hidden",
    boxShadow: `
      0 0 20px rgba(0,0,0,0.8),
      0 0 40px rgba(0,0,0,0.6),
      0 0 80px rgba(0,0,0,0.4)
    `,
  };

  const imageStyle = {
    maxWidth: "75vw",
    maxHeight: "75vh",
    objectFit: "contain",
    display: "block",
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