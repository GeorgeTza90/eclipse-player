import { useStylesToast } from "@/hooks/useStylesToast";
import { ToastItemProps } from "@/types/toast.types";

const ToastItem = ({ toast, onClose }: ToastItemProps) => {    
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