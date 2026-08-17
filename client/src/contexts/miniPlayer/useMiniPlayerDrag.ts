import { useEffect, useRef } from "react";
import { setJSON } from "@/utils/localStorageManager";
import type { MiniPlayerDragEvent, MiniPlayerDragProps } from "@/types/miniPlayer.types";

export const useMiniPlayerDrag = ({ pos, setPos, dragging, setDragging, rel, setRel }: MiniPlayerDragProps) => {
    const posRef = useRef(pos);
    posRef.current = pos;

    const onMouseDown = (event: MiniPlayerDragEvent): void => {
        setDragging(true);
        setRel({ x: event.clientX - pos.x, y: event.clientY - pos.y });
    };

    const onMouseMove = (event: MiniPlayerDragEvent): void => {
        if (!dragging) return;
        setPos({ x: event.clientX - rel.x, y: event.clientY - rel.y });
    };

    const onMouseUp = (): void => {
        if (!dragging) return;
        setDragging(false);
        setJSON("miniPlayer_position", posRef.current);
    };

    useEffect(() => {
        if (!dragging) return;

        const handleMouseMove = (event: globalThis.MouseEvent): void => {
            onMouseMove({ clientX: event.clientX, clientY: event.clientY });
        };

        const handleMouseUp = (): void => {
            onMouseUp();
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [dragging, rel]);

    return { onMouseDown, onMouseMove, onMouseUp };
};