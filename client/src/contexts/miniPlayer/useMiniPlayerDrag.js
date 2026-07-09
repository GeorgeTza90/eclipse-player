import { useEffect } from "react";
import { setJSON } from "../../utils/localStorageManager";

export const useMiniPlayerDrag = ({
    pos, setPos, dragging, setDragging, rel, setRel,
}) => {

    const onMouseDown = (e) => {
        const tag = e.target.tagName;
        if (tag === "INPUT" || tag === "BUTTON") return;
        setDragging(true);
        setRel({ x: e.clientX - pos.x, y: e.clientY - pos.y });
    };

    useEffect(() => {
        if (!dragging) return;

        const handleMouseMove = (e) => setPos({ x: e.clientX - rel.x, y: e.clientY - rel.y });

        const handleMouseUp = () => {
            setDragging(false);
            setJSON("miniPlayer_position", pos);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener( "mouseup", handleMouseUp);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

    }, [ dragging, rel, pos, setPos, setDragging ]);

    return { onMouseDown };

};