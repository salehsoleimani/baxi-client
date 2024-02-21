import styles from "./Button.module.css";

const Button = ({
                    disabled,
                    children,
                    onClick,
                    className = "",
                    isCallout = false
                }) => {
    const clickHandler = (e) => {
        e.stopPropagation();
        onClick();
    };

    const textSize = isCallout ? "callout" : "button";
    const type = isCallout ? "callout" : "primary";
    const classes = `${className} ${textSize} ${styles.btn} ${styles[type]} `;
    return (
        <button className={classes} onClick={clickHandler} disabled={disabled}>
            {children}
        </button>
    );
};

export default Button;
