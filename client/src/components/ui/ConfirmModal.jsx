export default function ConfirmModal({ message, onConfirm, onCancel }) {
    const overlayStyle = {
        position: "fixed",
        top: 0, left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
    };

    const contentStyle = {
        backgroundColor: "#1b1a1a",
        padding: "20px 30px",
        borderRadius: "8px",
        color: "#fff",
        minWidth: "300px",
        maxWidth: "90%",
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
        textAlign: "center",
    };

    const buttonsStyle = {
        display: "flex",
        justifyContent: "space-around",
        marginTop: "20px",
    };

    const buttonStyle = {
        padding: "8px 16px",
        borderRadius: "4px",
        fontWeight: "bold",
        border: "none",
        cursor: "pointer",
    };

    const confirmStyle = {
        ...buttonStyle,
        backgroundColor: "#2ecc71",
        color: "#fff",
    };

    const cancelStyle = {
        ...buttonStyle,
        backgroundColor: "#e74c3c",
        color: "#fff",
    };

    return (
        <div style={overlayStyle} onClick={onCancel}>
            <div style={contentStyle} onClick={(e) => e.stopPropagation()}>
                <p>{message}</p>
                <div style={buttonsStyle}>
                    <button style={confirmStyle} onClick={onConfirm}>Yes</button>
                    <button style={cancelStyle} onClick={onCancel}>No</button>
                </div>
            </div>
        </div>
    );
}
