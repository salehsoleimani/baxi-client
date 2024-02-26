import {useCallback, useEffect, useState} from "react";
import styles from "./LoginOtpForm.module.css";
import OTPInput from "react-otp-input";
import Button from "../ui/Button";
import ErrorMessage from "../ui/ErrorMessage";
import {useNavigate, useOutletContext} from "react-router-dom";
import useUrl from "../../hooks/useUrl";

const WAITING_TIME = 120;
const OTP_LENGTH = 4;

const LoginOtpForm = ({phoneNumber}) => {
    const {isLoading, setIsLoading} = useOutletContext();
    const BASE_URL = useUrl();
    const [otp, setOtp] = useState();
    const [hasError, setHasError] = useState(false);
    const [remainingTime, setRemainingTime] = useState(WAITING_TIME);
    const navigate = useNavigate();

    // send otp to user phone
    const sendOtp = useCallback(async () => {
        await fetch(`${BASE_URL}api/auth/otp`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({phone_number: phoneNumber})
            }
        );
    }, [phoneNumber, BASE_URL]);

    // resend-button timer
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

    const otpChangeHandler = (value) => {
        setOtp(value);
        setHasError(false);
        if (value.length === OTP_LENGTH) {
            const userLoginInfo = {
                phone_number: phoneNumber,
                otp: value,
            };
            const validateOtp = async () => {
                setIsLoading(true);

                try {
                    const res = await fetch(`${BASE_URL}api/account/login/`, {
                        method: "POST",
                        credentials: 'same-origin',
                        headers: {
                            Accept: 'application/json',
                            "content-type": "application/json",
                        },
                        body: JSON.stringify(userLoginInfo),
                    });
                    if (!res.ok) throw new Error("");
                    const cookies = res.headers.get('Set-Cookie');
                    print(cookies)
                    localStorage.setItem("baxi-access", cookies.get("Access-Token"));
                    localStorage.setItem("baxi-refresh", cookies.get("Refresh-Token"));
                    navigate("/my-account");
                } catch {
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
        <div className={styles.otpForm}>
            <p className="caption-lg">
                کد پیامک شده برای {phoneNumber} را وارد کنید
            </p>
            <OTPInput
                onChange={otpChangeHandler}
                value={otp}
                inputStyle={`body-sm ${styles.input} ${hasError && "error"}`}
                numInputs={6}
                separator={<span></span>}
                renderInput={(props) => <input {...props} />}
                containerStyle={styles.otpContainer}
                inputType="tel"
            />
            {hasError && (
                <ErrorMessage className={styles.error}>
                    کد وارد شده اشتباه است
                </ErrorMessage>
            )}
            {remainingTime === 0 ? (
                <Button onClick={sendOtpHandler} isSmall={true} type="tertiary">
                    ارسال مجدد پیامک
                </Button>
            ) : (
                <Button
                    isSmall={true}
                    type="tertiary"
                    className={styles.deactiveBtn}
                >
                    ارسال مجدد تا <span> {remainingTime} </span> ثانیه دیگر
                </Button>
            )}
        </div>
    );
};

export default LoginOtpForm;
