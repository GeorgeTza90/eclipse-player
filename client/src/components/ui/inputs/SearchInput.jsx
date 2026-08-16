import styles from "./searchInput.module.css"

const SearchInput = ({ placeholder, value, onChange }) => {
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