import ToastItem from "./ToastItem";
import { useIsMobile } from "../../../hooks/useIsMobile";
import { useStylesToast } from "../../../hooks/useStylesToast";

const ToastContainer = ({ toasts, closeToast }) => {
    const isMobile = useIsMobile();
    const { wrapper } = useStylesToast();

    return (
        <>
            <div style={wrapper}>
                {toasts.map(toast => (
                    <ToastItem
                        key={toast.id}
                        toast={toast}
                        onClose={closeToast}                        
                    />
                ))}
            </div>

            <style>
                {`@keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    } to {
                        transform: translateX(0);
                        opacity: 0.95;
                    }
                }`}
            </style>
        </>
    );
};

export default ToastContainer;