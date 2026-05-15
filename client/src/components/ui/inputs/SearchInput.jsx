import styles from "./searchInput.module.css"

const SearchInput = ({ placeholder, searchKey, onChange }) => {
    return (
        <div className={styles.container}>
            <input
                type="text"
                className={styles.input}
                placeholder={placeholder}
                value={searchKey}
                onChange={onChange}
            />
        </div>
    );
};

export default SearchInput;