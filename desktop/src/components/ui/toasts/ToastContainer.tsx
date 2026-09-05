import ToastItem from "./ToastItem";
import { useStylesToast } from "@/hooks/useStylesToast";
import type { ToastContainerProps } from "@/types/ui.types";

const ToastContainer = ({ toasts, closeToast }: ToastContainerProps) => {
    const { wrapper } = useStylesToast();

    return (
        <>
            <div style={wrapper}>
                {toasts && toasts.map(toast => (
                    <ToastItem key={toast.id} toast={toast} onClose={closeToast} />
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