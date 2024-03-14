import Icon from "./Icon";

const DataBox = ({src,backgroundColor,title,sub}) => {
  return (
    <div className={styles.box}>
      <Icon src={src} backgroundColor={backgroundColor} />
      <div className={styles.boxInfo}>
        <div>
          <p className="headline">{title}</p>
          <p className="sub-headline">{sub}</p>
        </div>
        <img src={leftArrow} />
      </div>
    </div>
  );
};

export default DataBox;
