import { useMiniPlayer } from "../../contexts/MiniPlayerContextWeb";

const Loader = ({ text, size }) => {
  const { goRGB } = useMiniPlayer();
  const containerStyle = {
    position: "relative",
    width: size === "small" ? "12rem" : "20rem",
    height: size === "small" ? "12rem" : "20rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: size === "small" ? "0rem" : "5rem",
    marginLeft: size === "small" ? "5rem" : "0rem",
  };

  const spinner1Style = {
    position: "absolute",
    opacity: goRGB ? "20%" : "2%",
    width: "95%",
    height: "95%",
    borderRadius: "35%",
    background: "conic-gradient(red, orange, yellow, green, cyan, blue, violet, red)",
    animation: "spin 3s linear infinite",    
    WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 10px), white calc(100% - 10px))",
    mask: "radial-gradient(farthest-side, transparent calc(100% - 10px), white calc(100% - 10px))",
  };

const spinner2Style = {
    position: "absolute",
    opacity: "60%",
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    background: "conic-gradient(white, grey, black, grey, grey, white)",
    animation: "spin 0.8s linear infinite",    
    WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 10px), white calc(100% - 10px))",
    mask: "radial-gradient(farthest-side, transparent calc(100% - 10px), white calc(100% - 10px))",
  };

  const spinner3Style = {
    position: "absolute",
    opacity: goRGB ? "0%" : "20%",
    width: "95%",
    height: "95%",
    borderRadius: "35%",
    background: "conic-gradient(white, black, white, black, white)",
    animation: "spin 3s linear infinite",    
    WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 10px), white calc(100% - 10px))",
    mask: "radial-gradient(farthest-side, transparent calc(100% - 10px), white calc(100% - 10px))",
  };

  const textStyle = {
    position: "absolute",
    margin: 0,
    fontSize: size === "small" ? "0.7rem" : "1rem",
    fontWeight: "bold",
    animation: "pulse 1.5s ease-in-out infinite",
  };

  return (
    <div style={containerStyle}>
      <div style={spinner3Style}></div>
      <div style={spinner1Style}></div>
      <p style={textStyle}>{text}</p>
      <div style={spinner2Style}></div>
    </div>
  );
};

export default Loader;