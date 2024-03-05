import rightArrow from "../../assets/glass-icons/arrow-right.svg";
import leftArrow from "../../assets/glass-icons/arrow-left.svg";
import styles from "./UserInfo.module.css";
import edit from "../../assets/icons/edit-2.svg";
import wallet from "../../assets/glass-icons/Frame 427320643.svg";
import treap from "../../assets/glass-icons/Frame 427320644.svg";
import address from "../../assets/glass-icons/Frame 427320645.svg";

const UserInfo = () => {
  return (
    <div className={styles.userInfo}>
      <div>
        <img src={rightArrow} className={styles.icon} />
        <div className={styles.userEdit}>
          <div>
            <div className={`headline ${styles.user}`}>محمد صالح سلیمانی</div>
            <div className={`sub-headline`}>۰۹۳۶۶۶۱۸۲۴۳</div>
          </div>
          <img src={edit} />
        </div>
      </div>
      <div>
        <div className={styles.box}>
          <img src={wallet} className={styles.image} />
          <div className={styles.boxInfo}>
            <div>
              <p className="sub-headline">کیف پول</p>
              <p className="body"> موجودی 7,000 تومان</p>
            </div>
            <img src={leftArrow} />
          </div>
        </div>
        <div className={styles.box}>
          <img src={treap} className={styles.image} />
          <div className={styles.boxInfo}>
            <p className="sub-headline">سفر های من</p>
          </div>
        </div>
        <div className={styles.box}>
          <img src={address} className={styles.image} />
          <div className={styles.boxInfo}>
            <p className="sub-headline">آدرس های منتخب</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
