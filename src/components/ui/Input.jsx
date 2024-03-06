import styles from "./Input.module.css";

const Input = ({
                   id,
                   name,
                   onChange,
                   defaultValue = "",
                   placeholder,
                   type = "text",
                   className = "",
                   disabled,
               }) => {
    return (
            <input
                id={id}
                name={name}
                onChange={onChange}
                disabled={disabled}
                className={`sub-headline  ${styles.input} ${className}`}
                defaultValue={defaultValue}
                placeholder={placeholder}
                type={type}
            />
    );
};

export default Input;
