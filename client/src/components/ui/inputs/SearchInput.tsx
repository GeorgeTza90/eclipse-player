import type { SearchInputProps } from "@/types/ui.types";
import styles from "./searchInput.module.css";

const SearchInput = ({ placeholder, value, onChange }: SearchInputProps) => {
    return (
        <div className={styles.container}>
            <input
                type="text"
                className={styles.input}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default SearchInput;