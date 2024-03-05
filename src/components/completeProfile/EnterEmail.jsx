
import Notification from "../../assets/glass-icons/Notification.png";
import styles from "./EnterEmail.module.css";
import arrowLeft from "../../assets/glass-icons/arrow-left.png";
import { useNavigate } from "react-router-dom";
import Input from "../ui/Input";
import Button from "../ui/Button";

import arrowRight from '../../assets/icons/arrow-right.svg'
import { useState } from "react";

const EnterEmail = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const EmailHandler = (e) => {
        setEmail(e.target.value)
    }

    return (
        <div className={styles.EnterEmail}>
            <div className={styles.header}>
                <img src={Notification} className={styles.icon} />
                <img src={arrowLeft} className={styles.arrow} onClick={() => navigate(-1)} />
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
                    <Button type="filled" className={styles.button} onClick={() => navigate('email')}>
                        <img src={arrowRight} alt="arrow icon" />
                        <span className="button">ادامه</span>
                    </Button>
                    <button className={`button ${styles.LaterButton}`}>بعدا</button>
                </div>
            </form>
        </div>
    );
};

export default EnterEmail;
