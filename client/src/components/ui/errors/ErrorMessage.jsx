import { useEffect, useState } from "react";

const ErrorMessage = ({ message = "Loading Collection ...", height = "50vh" }) => {
    const [visible, setVisible] = useState(true);

    const styleDiv = {
        height: height,
        flexDirection: "flex",
        justifyContent: "center",
        alignItems: "center",
    }

    const styleP = {
        opacity: visible ? 1 : 0,
        marginTop: 5
    }

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

export default ErrorMessage;