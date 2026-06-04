import VinylCard from "./VinylCard";

const VinylCardSlot = ({ item, type, onNavigate, className }) => {
    return (
        <div className={className}>
            <VinylCard
                item={item}
                type={type}
                onClick={onNavigate}
            />
        </div>
    );
};

export default VinylCardSlot;