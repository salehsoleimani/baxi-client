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

const WAITING_TIME = 120;
const OTP_LENGTH = 4;

const LoginOtpForm = ({phoneNumber}) => {
    const [otp, setOtp] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
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
            navigate('/login', {state: {from: location, status_code: err.response.status}, replace: true});
        });
    }, [phoneNumber]);

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
        setHasError(false);
        if (value.length === OTP_LENGTH) {
            const userLoginInfo = {
                phone_number: phoneNumber, otp_code: value,
            };

            // validate otp
            (async () => {
                setIsLoading(true);

                const res = await axios.post('auth/login/', userLoginInfo, {
                    credentials: 'same-origin', headers: {
                        "Accept": "application/json", "Content-Type": "application/json"
                    },
                }).then(() => {
                    const cookies = res.headers.get('Set-Cookie');
                    localStorage.setItem("Refresh-Token", cookies.get("Refresh-Token"));
                    localStorage.setItem("Access-Token", cookies.get("Access-Token"));
                    navigate("/home");
                }).catch(err => {
                    setHasError(true);
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
            inputStyle={`sub-headline ${styles.input} ${hasError && "error"}`}
            numInputs={4}
            separator={<span></span>}

            renderInput={(props) => <input {...props} />}
            containerStyle={styles.otpContainer}
            inputType="tel"
            shouldAutoFocus={true}

        />}
        {hasError && !isLoading && (<ErrorMessage className={styles.error}>
            کدی که وارد کردی اشتباهه
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
