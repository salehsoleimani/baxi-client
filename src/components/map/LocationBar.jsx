import styles from './LocationBar.module.css'
import location from '../../assets/icons/location.svg'
import search from '../../assets/icons/search-normal.svg'
import Button from '../ui/Button'
import Input from "../ui/Input";

const LocationBar = () => {
    return (
        <div className={styles.LocationBar}>
            {/*<div  className={styles.inputSearch}>*/}
            <Input
                placeholder="جستجوی..."
                className={styles.inputContainer}
                // className={`sub-headline ${styles.input}`}
                type='search'>
                <img src={search} alt="search"/>
                <img src={location} alt="location"/>
            </Input>


            {/*</div>*/}
            <div className={styles.savedLocations}>
                <div className={styles.savedLocation}>
                    {/*<img src={star} />*/}
                    <span>خونه</span>
                </div>
                <div className={styles.savedLocation}>
                    {/*<img src={star} />*/}
                    <span>خونه</span>

                </div>
            </div>
            <Button type="filled" className={styles.bottomSheetButton}>
                <span className="button2">تایید مبدا</span>
            </Button>
        </div>
    )
}

export default LocationBar;