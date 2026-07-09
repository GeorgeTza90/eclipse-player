import styles from "./confirmModal.module.css";

const ConfirmModal = ({ message, onConfirm, onCancel }) => {
    return (
        <div className={styles.overlay} onClick={onCancel}>
            <div className={styles.content} onClick={(e) => e.stopPropagation()}>
                <p>{message}</p>
                <div className={styles.buttons}>
                    <button
                        className={`${styles.button} ${styles.confirm}`}
                        onClick={onConfirm}
                    >
                        Yes
                    </button>


                    <button
                        className={`${styles.button} ${styles.cancel}`}
                        onClick={onCancel}
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};


export default ConfirmModal;