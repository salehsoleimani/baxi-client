import {useEffect, useRef, useState} from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import ErrorMessage from "../ui/ErrorMessage";
import {useLocation, useNavigate} from "react-router-dom";
import styles from "./LoginForm.module.css"
import arrowRight from "../../assets/icons/arrow-right.svg"
import Loading from "../ui/Loading";

const LoginForm = ({phoneNumber, setPhoneNumber}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();
    const from_status_code = location.state?.status_code || 200;

    // Handle Spam And Bad Gateway
    useEffect(() => {
        if (from_status_code === 502) setError("مشکلی در ارسال پیامک از طرف ما پیش اومده، لطفا دوباره امتحان کنید");
        else if (from_status_code === 400) setError("به تازگی درخواست کد فعالسازی فرستاده‌اید، تا یک دقیقه دیگر مجددا امتحان کنید");
    }, [from_status_code])


    const inputChangeHandler = (e) => {
        setPhoneNumber(e.target.value);
        setError(null);
    };

    const phoneValidate = () => {
        if (!phoneNumber.match(/((0?9)|(\+?989))\d{2}\W?\d{3}\W?\d{4}/g)) {
            setError("شماره موبایل وارد شده معتبر نیست");
            return false;
        }
        return true
    };

    const submitHandler = (e) => {
        e.preventDefault();
        setError(null);
        if (!phoneValidate()) return;
        navigate("./otp");
        setIsLoading(false);
    };

    return (isLoading ? <Loading/> : <form className={styles.loginForm} onSubmit={submitHandler}>
        <h5 className="title2">ورود</h5>
        <p className={`${styles.subHeadline} sub-headline`}>شماره موبایلت رو بزن تا یه کد برات بفرستیم</p>
        <div className={styles.inputField}>
            <Input
                type="text"
                value={phoneNumber}
                onChange={inputChangeHandler}
                placeholder="شماره موبایل"
                id="phone-number"
                className={error != null ? `error` : ''}
            />
            {error != null && (<ErrorMessage>{error}</ErrorMessage>)}
        </div>
        <span
            hidden={error != null}
            className={`${styles.caption} caption`}
        >کد تائید رو به این شماره پیامک می‌کنیم</span>

        <Button type="filled" className={styles.buttonRightEnd}>
            <img
                src={arrowRight}
                alt="arrow icon"
            />
            <span className="button">ادامه</span>
        </Button>
    </form>);
};

export default LoginForm;
