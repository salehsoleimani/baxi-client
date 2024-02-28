import styles from "./Button.module.css";

const Button = ({
                    type = "callout",
                    disabled,
                    children,
                    onClick,
                    className = "",
                    callout
                }) => {
    const clickHandler = (e) => {
        if (!onClick)
            return;
        e.stopPropagation();
        e.target.blur();
        e.preventDefault()
        onClick();
    };

    const textSize = callout ? "button2" : "button";
    const classes = `${className} ${textSize} ${styles.btn} ${styles[type]} `;
    return (
        <button className={classes} onClick={clickHandler} disabled={disabled}>
            {children}
        </button>
    );
};

export default Button;
