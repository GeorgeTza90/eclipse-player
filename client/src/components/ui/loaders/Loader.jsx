import { useMiniPlayer } from "../../../contexts/MiniPlayerContextWeb";
import { useStylesLoader } from "../../../hooks/useStylesLoader";

export const Loader = ({ text, size }) => {
    const { goRGB } = useMiniPlayer();

    const { 
        containerStyle, textStyle,
        spinner1Style, spinner2Style, spinner3Style
    } = useStylesLoader(goRGB, size);    

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