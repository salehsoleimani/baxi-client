import Icon from "../ui/Icon";
import styles from './SavedAddress.module.css'
import leftArrow from '../../assets/icons/arrow-left.svg'

const SavedAddress = () => {
  return (
    <div className={styles.box}>
      {/* <Icon src={wallet} backgroundColor={"#FFF6F3"} /> */}
      <div className={styles.boxInfo}>
        <div>
          <p className="headline">خونه</p>
          <p className="sub-headline">همدان، مهدیه، کوچه شهید احمدی...</p>
        </div>
        <img src={leftArrow} />
      </div>
    </div>
  );
};

export default SavedAddress;
