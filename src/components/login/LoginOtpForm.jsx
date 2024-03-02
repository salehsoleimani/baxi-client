import {useCallback, useEffect, useState} from "react";
import styles from "./LoginForm.module.css";
import OTPInput from "react-otp-input";
import Button from "../ui/Button";
import ErrorMessage from "../ui/ErrorMessage";
import {useLocation, useNavigate} from "react-router-dom";
import smsIcon from "../../assets/glass-icons/Chat.png"
import arrowLeftIcon from "../../assets/icons/arrow-left.svg"
import {CircularProgress} from "@mui/joy";
import axios from "../../helpers/axios";
import useAuth from "../../hooks/useAuth";

const WAITING_TIME = 120;
const OTP_LENGTH = 4;

const LoginOtpForm = ({phoneNumber}) => {
    const {setAuth} = useAuth();

    const [otp, setOtp] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [remainingTime, setRemainingTime] = useState(WAITING_TIME);

    const navigate = useNavigate();
    const location = useLocation();

    const remainingSeconds = remainingTime.toString(10);
    let hours = Math.floor(remainingSeconds / 3600);
    let minutes = Math.floor((remainingSeconds - (hours * 3600)) / 60)
    let seconds = remainingSeconds - (hours * 3600) - (minutes * 60);

    const sendOtp = useCallback(async () => {
        console.log(phoneNumber)
        await axios.post('auth/otp/', {
            'phone_number': phoneNumber
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
        }).catch(err => {
            console.log(err);
            const status_code = err.response?.status
            if (status_code === 400) return setError("به تازگی درخواست کد فعالسازی فرستاده‌اید، تا یک دقیقه دیگر مجددا امتحان کنید");
            else if (!status_code)  return setError("اتصال خود به اینترنت را بررسی کنید");
            navigate('/login', {state: {from: location, status_code: status_code}, replace: true});
        });
    }, [location, phoneNumber]);

    useEffect(() => {
        if (remainingTime === 0) return;
        const timer = setInterval(() => {
            setRemainingTime((curTime) => curTime - 1);
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [remainingTime, setRemainingTime]);

    useEffect(() => {
        sendOtp();
    }, [sendOtp]);

    const otpChangeHandler = (value) => {
        setOtp(value);
        setError(null);
        if (value.length === OTP_LENGTH) {
            const userLoginInfo = {
                phone_number: phoneNumber, otp_code: value,
            };

            // validate otp
            (async () => {
                setIsLoading(true);

                const res = await axios.post('auth/login/', userLoginInfo, {
                    withCredentials: true,
                    // TODO: consider in production:
                    // credentials: 'same-origin',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                }).then(() => {
                    const accessToken = res?.data?.accessToken;
                    const refreshToken = res?.data?.refreshToken;
                    setAuth({accessToken});
                    navigate("/home", {replace: true});
                }).catch(err => {
                    setError("کدی که وارد کردی اشتباهه");
                });

                setIsLoading(false);
            })();
        }
    };

    const sendOtpHandler = () => {
        setRemainingTime(WAITING_TIME);
        sendOtp();
    };


    const backBtnHandler = () => {
        navigate(-1);
    };


    return (<div className={styles.loginForm}>
        <img
            src={smsIcon}
            alt="sms icon"
            className={styles.icon}
        />
        <h5 className="title2">یه کد برات فرستادیم</h5>
        <p className={`${styles.subHeadline} sub-headline`}>
            کد ۴ رقمی پیامک شده برای {phoneNumber} را وارد کنید
        </p>
        {isLoading ? <CircularProgress style={{margin: '0 auto'}} color="neutral"
                                       size="md"
                                       variant="plain"/> : <OTPInput
            onChange={otpChangeHandler}
            value={otp}
            inputStyle={`sub-headline ${styles.input} ${error!==null && "error"}`}
            numInputs={4}
            separator={<span></span>}

            renderInput={(props) => <input {...props} />}
            containerStyle={styles.otpContainer}
            inputType="tel"
            shouldAutoFocus={true}

        />}
        {error!=null && !isLoading && (<ErrorMessage className={styles.error}>
            {error}
        </ErrorMessage>)}
        {

            <Button
                className={styles.buttonRight}
                onClick={sendOtpHandler} callout={true} disabled={remainingTime !== 0}>
                {remainingTime === 0 ? "کدی دریافت نکردم" : `کد رو دریافت نکردم (${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds})`}
            </Button>}
        <Button
            className={styles.buttonLeftEnd}
            onClick={backBtnHandler}
        >
            <span className="button2">ویرایش شماره</span>
            <img
                src={arrowLeftIcon}
                alt="arrow left icon"
                className={styles.icon}
            />
        </Button>
    </div>);
};

export default LoginOtpForm;
