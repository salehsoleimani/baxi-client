import {useState} from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import ErrorMessage from "../ui/ErrorMessage";
import {useNavigate, useOutletContext} from "react-router-dom";
import styles from "./LoginForm.module.css"
import arrowRight from "../../assets/icons/arrow-right.svg"
import Loading from "../ui/Loading";

const LoginForm = ({phoneNumber, setPhoneNumber}) => {
    const [isLoading, setIsLoading] = useState(false);

    const [hasError, setHasError] = useState(false);
    const navigate = useNavigate();

    const inputChangeHandler = (e) => {
        setPhoneNumber(e.target.value);
        setHasError(false);
    };

    const phoneValidate = () => {
        if (!phoneNumber.match(/((0?9)|(\+?989))\d{2}\W?\d{3}\W?\d{4}/g)) {
            setHasError(true);
            return false;
        }
        return true
    };

    const submitHandler = (e) => {
        e.preventDefault();
        setHasError(false);
        if (!phoneValidate()) return;
        navigate("./otp");
        setIsLoading(false);
    };

    return (
        isLoading ? <Loading/> : <form className={styles.loginForm} onSubmit={submitHandler}>
            <h5 className="title2">ورود</h5>
            <p className={`${styles.subHeadline} sub-headline`}>شماره موبایلت رو بزن تا یه کد برات بفرستیم</p>
            <div className={styles.inputField}>
                <Input
                    type="text"
                    value={phoneNumber}
                    onChange={inputChangeHandler}
                    placeholder="شماره موبایل"
                    id="phone-number"
                    className={hasError ? `error` : ''}
                />
                {hasError && (
                    <ErrorMessage>شماره وارد شده نامعتبر است</ErrorMessage>
                )}
            </div>
            <span
                hidden={hasError}
                className={`${styles.caption} caption`}
            >کد تائید رو به این شماره پیامک می‌کنیم</span>

            <Button type="filled" className={styles.buttonRightEnd}>
                <img
                    src={arrowRight}
                    alt="arrow icon"
                />
                <span className="button">ادامه</span>
            </Button>
        </form>
    );
};

export default LoginForm;
