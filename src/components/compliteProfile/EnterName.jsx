import profile from "../../assets/glass-icons/Profile.png";
import styles from "./EnterName.module.css";
import arrowLeft from "../../assets/glass-icons/arrow-left.png";
import Input from "../ui/Input";
import Button from "../ui/Button";

import arrowRight from '../../assets/icons/arrow-right.svg'

const EnterName = () => {
  return (
    <div className={styles.EnterName}>
      <div className={styles.header}>
        <img src={profile} className={styles.icon} />
        <img src={arrowLeft} className={styles.arrow} />
      </div>
      <h1 className={`title2 ${styles.title}`}>تکمیل پروفایل</h1>
      <p className={`sub-headline ${styles.subHeadLine}`}>
        نام شما برای راننده نمایش داده می‌شود
      </p>
      <form className={styles.loginForm}>
        <div className={styles.inputField}>
          <Input
            type="text"
            // value={}
            // onChange={}
            placeholder="نام"
            id="phone-number"
            // className={hasError ? `error` : ''}
          />
        </div>
        <div className={styles.inputField}>
          <Input
            type="text"
            // value={}
            // onChange={}
            placeholder="نام خانوادگی"
            id="phone-number"
            // className={hasError ? `error` : ''}
          />
        </div>

        <Button type="filled" className={styles.button}>
          <img src={arrowRight} alt="arrow icon" />
          <span className="button">ادامه</span>
        </Button>
      </form>
    </div>
  );
};

export default EnterName;
