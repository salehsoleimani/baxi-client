import {useCallback, useEffect, useState} from "react";
import styles from "./LoginForm.module.css";
import OTPInput from "react-otp-input";
import Button from "../ui/Button";
import ErrorMessage from "../ui/ErrorMessage";
import {useNavigate, useOutletContext} from "react-router-dom";
import useUrl from "../../hooks/useUrl";
import smsIcon from "../../assets/glass-icons/Chat.png"
import arrowLeftIcon from "../../assets/icons/arrow-left.svg"
import inputStyles from "../../components/ui/Input.module.css"
import Input from "../ui/Input";
import Loading from "../ui/Loading";

const WAITING_TIME = 120;
const OTP_LENGTH = 4;

const LoginOtpForm = ({phoneNumber}) => {
    const BASE_URL = useUrl();
    const [otp, setOtp] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [remainingTime, setRemainingTime] = useState(WAITING_TIME);
    const navigate = useNavigate();

    const remainingSeconds = remainingTime.toString(10);
    let hours = Math.floor(remainingSeconds / 3600);
    let minutes = Math.floor((remainingSeconds - (hours * 3600)) / 60)
    let seconds = remainingSeconds - (hours * 3600) - (minutes * 60);

    const sendOtp = useCallback(async () => {
        console.log(phoneNumber)
        await fetch(`${BASE_URL}api/auth/otp/`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    phone_number: phoneNumber,
                }),
            }
        );
    }, [phoneNumber, BASE_URL]);

    useEffect(() => {
        if (remainingTime === 0) return;
        const timer = setInterval(() => {
            setRemainingTime((curTime) => curTime - 1);
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [remainingTime]);

    // send otp when page loads
    useEffect(() => {
        sendOtp();
    }, [sendOtp]);

    const backBtnHandler = () => {
        navigate(-1);
    };

    const otpChangeHandler = (value) => {
        setOtp(value);
        setHasError(false);
        if (value.length === OTP_LENGTH) {
            const userLoginInfo = {
                phone_number: phoneNumber,
                otp_code: value,
            };
            const validateOtp = async () => {
                setIsLoading(true);

                try {
                    const res = await fetch(`${BASE_URL}api/auth/login/`, {
                        method: "POST",
                        credentials: 'same-origin',
                        headers: {
                            Accept: 'application/json',
                            "content-type": "application/json",
                        },
                        body: JSON.stringify(userLoginInfo),
                    });

                    if (res.status !== 200) throw new Error("");

                    const cookies = res.headers.get('Set-Cookie');
                    localStorage.setItem("Refresh-Token", cookies.get("Refresh-Token"));
                    localStorage.setItem("Access-Token", cookies.get("Access-Token"));
                    navigate("/home");
                } catch (e) {
                    setHasError(true);
                } finally {
                    setIsLoading(false);
                }
            };
            validateOtp();
        }
    };

    const sendOtpHandler = () => {
        setRemainingTime(WAITING_TIME);
        sendOtp();
    };

    return (
        isLoading ? <Loading/> : <div className={styles.loginForm}>
            <img
                src={smsIcon}
                alt="sms icon"
                className={styles.icon}
            />
            <h5 className="title2">یه کد برات فرستادیم</h5>
            <p className={`${styles.subHeadline} sub-headline`}>
                کد ۴ رقمی پیامک شده برای {phoneNumber} را وارد کنید
            </p>
            <OTPInput
                onChange={otpChangeHandler}
                value={otp}
                inputStyle={`sub-headline ${styles.input} ${hasError && "error"}`}
                numInputs={4}
                separator={<span></span>}

                renderInput={(props) => <input {...props} />}
                containerStyle={styles.otpContainer}
                inputType="tel"
                shouldAutoFocus={true}

            />
            {hasError && (
                <ErrorMessage className={styles.error}>
                    کدی که وارد کردی اشتباهه
                </ErrorMessage>
            )}
            {

                <Button
                    className={styles.buttonRight}
                    onClick={sendOtpHandler} callout={true} disabled={remainingTime !== 0}>
                    {remainingTime === 0 ? "کد رو دریافت نکردم" :
                        `کد رو دریافت نکردم (${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds})`}
                </Button>
            }
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
        </div>
    );
};

export default LoginOtpForm;
