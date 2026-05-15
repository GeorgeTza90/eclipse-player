import styles from "./formInput.module.css";

const FormInput = ({type, name, placeholder, value, onChangeText, isForm = true }) => {
    return (
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value ?? ""}
            onChange={(e) => onChangeText(e.target.value)}
            className={isForm ? styles.input1 : styles.input2}
            autoComplete={name ?? "off"}
        />
    );
}

export default FormInput;