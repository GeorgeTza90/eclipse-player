import { useEffect, useState } from "react";
import { useStylesLoader } from "../../../hooks/useStylesLoader";

const LoadingMessage = ({ message = "Loading Collection ...", height = "50vh" }) => {
    const [visible, setVisible] = useState(true);
    const { styleDiv, styleP } = useStylesLoader(height, visible);

    useEffect(() => {
        const interval = setInterval(() => {
            setVisible(prev => !prev);
        }, 200);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={styleDiv}>
            <div className="spinner" />
            <p style={styleP}>{message}</p>
        </div>
    );
}

export default LoadingMessage;