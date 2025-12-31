import styles from "./searchInput.module.css"

export default function SearchInput({ placeholder, searchKey, onChange }) {
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