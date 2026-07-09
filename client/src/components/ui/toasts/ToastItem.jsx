import { useIsMobile } from "../../../hooks/useIsMobile";
import { useStylesToast } from "../../../hooks/useStylesToast";

const ToastItem = ({ toast, onClose }) => {
    const isMobile = useIsMobile();
    const { toastItemStyle, closeButtonStyle } = useStylesToast(toast.type);

    return (
        <div style={toastItemStyle(toast.type)}>
            <span>{toast.message}</span>
            <button 
                onClick={() => onClose(toast.id)}
                style={closeButtonStyle}
            >
                ✕
            </button>
        </div>
    );
};

export default ToastItem;