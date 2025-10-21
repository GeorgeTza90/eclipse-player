import { Eye, EyeOff } from "lucide-react";
import styles from "./passwordInput.module.css";

export default function PasswordInput({
    value,
    show,
    placeholder,
    onChangeText,
    setShow,
}) {
    return (
        <div className={styles.inputWrapper}>
            <input
                type={show ? "text" : "password"}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChangeText(e.target.value)}
                className={styles.input}
            />
            <button
                type="button"
                className={styles.eyeIcon}
                onClick={() => setShow(!show)}
            >
                {show ? <EyeOff size={20} color="#555" /> : <Eye size={20} color="#555" />}
            </button>
        </div>
    );
}
