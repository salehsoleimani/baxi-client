import styles from "./FirstAddress.module.css";
import rightArrow from "../../assets/icons/arrow-right.svg";
import addImg from "../../assets/img/addImg.png";
import add from "../../assets/icons/add.svg";
import Button from "../ui/Button";

const FirstAddress = () => {
  return (
    <div className={styles.firstAddress}>
      <img src={rightArrow} className={styles.icon} />
      <p className={`title2`}>آدرس های منتخب</p>
      <div className={styles.addImg}>
        <img src={addImg} />
        <div className="sub-headline">هنوز آدرس منتخبی ذخیره نکرده اید</div>
      </div>
      <Button type="text" className={styles.button}>
        <img src={add} />
        <span>ذخیره آدرس جدید</span>
      </Button>
    </div>
  );
};

export default FirstAddress;
