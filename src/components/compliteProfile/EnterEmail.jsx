
import Notification from "../../assets/glass-icons/notification.png";
import styles from "./EnterEmail.module.css";
import arrowLeft from "../../assets/icons/arrow-left.svg";
import { useNavigate } from "react-router-dom";
import Input from "../ui/Input";
import Button from "../ui/Button";

import arrowRight from '../../assets/icons/arrow-right.svg'
import { useState } from "react";

const EnterEmail = () => {
    const navigat = useNavigate();
    const [email, setEmail] = useState('')
    const EmailHandler = (e) => {
        setEmail(e.target.value)
    }

    return (
        <div className={styles.EnterEmail}>
            <div className={styles.header}>
                <img src={Notification} className={styles.icon} />
                <img src={arrowLeft} className={styles.arrow} onClick={() => navigat(-1)} />
            </div>
            <h1 className={`title2 ${styles.title}`}>ایمیل</h1>
            <p className={`sub-headline ${styles.subHeadLine}`}>
                کد های تخفیف رو به این آدرس ایمیل می‌کنیم
            </p>
            <form className={styles.loginForm}>
                <Input
                    type="email"
                    value={email}
                    onChange={EmailHandler}
                    placeholder="مثلا: you@baxi.com"
                    id="email"
                    className={styles.inputField}
                />
                <div className={styles.buttonsHolder}>
                    <Button type="filled" className={styles.buttonNext} onClick={() => navigat('email')}>
                        <img src={arrowRight} alt="arrow icon" />
                        <span className="button">ادامه</span>
                    </Button>
                    <Button type="tonal" className={styles.buttonLater} onClick={() => navigat('email')}>
                        {/* <img src={arrowRight} alt="arrow icon" /> */}
                        <span className="button">بعدا</span>
                    </Button>
                    {/* <button className={`button ${styles.LaterButton}`}>بعدا</button> */}
                </div>
            </form>
        </div>
    );
};

export default EnterEmail;
