import rightArrow from "../../assets/icons/arrow-right.svg";
import leftArrow from "../../assets/icons/arrow-left.svg";
import styles from "./UsrInfo.module.css";
import edit from "../../assets/icons/edit-2.svg";
import wallet from "../../assets/glass-icons/wallet-3.svg";
import trip from "../../assets/glass-icons/routing-2.svg";
import star from "../../assets/glass-icons/star.svg";
import Icon from "../ui/Icon";

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
          <Icon src={wallet} backgroundColor={'#FFF6F3'} />
          <div className={styles.boxInfo}>
            <div>
              <p className="headline">کیف پول</p>
              <p className="sub-headline"> موجودی 7,000 تومان</p>
            </div>
            <img src={leftArrow} />
          </div>
        </div>
        <div className={styles.box}>
          <Icon src={trip} backgroundColor={'#E6F8FF'} />
          <div className={styles.boxInfo}>
            <p className="headline">سفر های من</p>
          </div>
        </div>
        <div className={styles.box}>
          <Icon src={star} backgroundColor={'#ECFCEC'} />
          <div className={styles.boxInfo}>
            <p className="headline">آدرس های منتخب</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
