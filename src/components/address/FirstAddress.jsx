import styles from "./FirstAddress.module.css";
import rightArrow from "../../assets/glass-icons/arrow-right.svg";
import addImg from "../../assets/glass-icons/Group 1171275056.svg";
import add from "../../assets/glass-icons/add.svg";

const FirstAddress = () => {
  return (
    <div className={styles.firstAddress}>
      <img src={rightArrow} className={styles.icon} />
      <p className={`title2`}>آدرس های منتخب</p>
      <div className={styles.addImg}>
        <img src={addImg} />
        <div className="body">هنوز آدرس منتخبی ذخیره نکرده اید</div>
      </div>
      <button className={`button2 ${styles.bottom}`}>
        <img src={add} />
        <span>ذخیره آدرس جدید</span>
      </button>
    </div>
  );
};

export default FirstAddress;
