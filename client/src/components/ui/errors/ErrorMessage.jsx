import { useEffect, useState } from "react";
import { useStylesError } from "../../../hooks/useStylesError";

const ErrorMessage = ({ message = "Something went wrong.", height = "50vh" }) => {
    const [visible, setVisible] = useState(true);
    const { styleDiv, styleP } = useStylesError(height, visible);

    useEffect(() => {
        const interval = setInterval(() => {
            setVisible(prev => !prev);
        }, 200);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={styleDiv}>
            <p style={styleP}>{message}</p>
        </div>
    );
}

export default ErrorMessage;