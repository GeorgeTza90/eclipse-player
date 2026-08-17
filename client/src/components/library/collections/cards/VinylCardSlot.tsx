import VinylCard from "./VinylCard";
import { VinylCardSlotProps } from "@/types/vinyl.types";

const VinylCardSlot = ({ item, type, onNavigate, className }: VinylCardSlotProps) => {
    return (
        <div className={className}>
            <VinylCard item={item} type={type} onClick={onNavigate} />
        </div>
    );
};

export default VinylCardSlot;