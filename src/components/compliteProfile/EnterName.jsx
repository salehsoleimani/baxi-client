import profile from "../../assets/glass-icons/Profile.png";
import styles from "./EnterName.module.css";
import arrowLeft from "../../assets/icons/arrow-left.svg";
import {useNavigate} from "react-router-dom";
import Input from "../ui/Input";
import Button from "../ui/Button";

import arrowRight from '../../assets/icons/arrow-right.svg'
import { useState } from "react";

const EnterName = () => {
  const navigat = useNavigate();
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const nameHandler = (e) => {
    setName(e.target.value)
  }
  const lastNameHandler = (e) => {
    setLastName(e.target.value)
  }
  return (
    <div className={styles.EnterName}>
      <div className={styles.header}>
        <img src={profile} className={styles.icon} />
        <img src={arrowLeft} className={styles.arrow} onClick={() => navigat(-1)} />
      </div>
      <h1 className={`title2 ${styles.title}`}>تکمیل پروفایل</h1>
      <p className={`sub-headline ${styles.subHeadLine}`}>
        نام شما برای راننده نمایش داده می‌شود
      </p>
      <form className={styles.loginForm}>
          <Input
            type="text"
            value={name}
            onChange={nameHandler}
            placeholder="نام"
            id="name"
            className={styles.inputField}
          />
          <Input
            type="text"
            value={lastName}
            onChange={lastNameHandler}
            placeholder="نام خانوادگی"
            id="last-name"
            className={styles.inputField}
          />

        <Button type="filled" className={styles.button} onClick={() => navigat('email')}>
          <img src={arrowRight} alt="arrow icon" />
          <span className="button">ادامه</span>
        </Button>
      </form>
    </div>
  );
};

export default EnterName;
