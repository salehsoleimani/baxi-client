import styles from './LocationBar.module.css'
import regtangle from '../../assets/glass-icons/Rectangle.png'
import location from '../../assets/icons/location.svg'
import search from '../../assets/icons/search-normal.svg'
import star from '../../assets/glass-icons/Frame 427320646.svg'
import Button from '../ui/Button'
const LocationBar = () => {
    return (
        <div className={styles.LocationBar}>
            <img src={regtangle} className={styles.icon} />
            <div  className={styles.inputSearch}>
                <img src={search} />
                <input
                    className={`sub-headline ${styles.input}`}
                    type='search'>
                </input>
                <img src={location} />

            </div>
            <div className={styles.savedLocations}>
                <div className={styles.savedLocation}>
                    <img src={star} />
                    <span>خونه</span>
                </div>
                <div className={styles.savedLocation}>
                    <img src={star} />
                    <span>خونه</span>

                </div>
            </div>
            <Button type="filled" className={styles.acpButton}>
                <span className="button2">تایید مبدا</span>
            </Button>
        </div>
    )
}

export default LocationBar;