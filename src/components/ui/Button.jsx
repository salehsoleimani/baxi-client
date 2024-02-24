import styles from "./Button.module.css";

const Button = ({
                    type,
                    disabled,
                    children,
                    onClick,
                    className = "",
                    callout
                }) => {
    const clickHandler = (e) => {
        e.stopPropagation();
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
