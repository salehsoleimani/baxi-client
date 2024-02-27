import {useState} from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import ErrorMessage from "../ui/ErrorMessage";
import {useNavigate, useOutletContext} from "react-router-dom";
import {useAuth} from "../../context/AuthProvider";
import useUrl from "../../hooks/useUrl";
import styles from "./LoginForm.module.css"
import arrowRight from "../../assets/icons/arrow-right.svg"

const LoginForm = () => {
    const {isLoading, setIsLoading} = useOutletContext();

    const [phoneNumber, setPhoneNumber] = useState("");
    const [hasError, setHasError] = useState(false);
    const navigate = useNavigate();

    const inputChangeHandler = (e) => {
        setPhoneNumber(e.target.value);
        setHasError(false);
    };

    const phoneValidate = () => {
        if (phoneNumber.length < 10 || phoneNumber.length > 13) {
            setHasError(true);
            return false;
        } else {
            return true;
        }
    };

    const submitHandler = (e) => {
        setIsLoading(true);
        e.preventDefault();
        setHasError(false);
        if (!phoneValidate()) return;
        navigate("./otp");
        setIsLoading(false);
    };

    return (
        <form className={styles.loginForm} onSubmit={submitHandler}>
            <h5 className="title2">ورود</h5>
            <p className={`${styles.subHeadline} sub-headline`}>شماره موبایلت رو بزن تا یه کد برات بفرستیم</p>
            <div className={styles.inputField}>
                <Input
                    type="text"
                    value={phoneNumber}
                    onChange={inputChangeHandler}
                    placeholder="شماره موبایل"
                    id="phone-number"
                    className={hasError ? `error` : styles.input}
                />
                {hasError && (
                    <ErrorMessage>شماره وارد شده نامعتبر است</ErrorMessage>
                )}
            </div>
            <span
                hidden={hasError}
                className={`${styles.caption} caption`}
            >کد تائید رو به این شماره پیامک می‌کنیم</span>

            <Button type="filled">
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
