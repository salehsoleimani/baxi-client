import React, {useEffect, useRef} from 'react';
import styles from './HomePage.module.css'
import {BottomSheet} from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
import {useState} from "react";
import SheetContent from "../ui/SheetContent.tsx";
import Button from "../ui/Button";
import Input from "../ui/Input";
import search from "../../assets/icons/search-normal.svg";
import location from "../../assets/icons/location.svg";
import NeshanMap from "@neshan-maps-platform/react-openlayers"

const Maps = () => {
    const [open, setOpen] = useState(true);
    const neshanToken = 'web.11c86d9ad4654f708f74425d9a297b9f';
    const mapRef = useRef(null)

    const [ol, setOl] = useState()
    const [olMap, setOlMap] = useState()
    const onInit = (ol, map) => {
        setOl(ol)
        setOlMap(map)
    }
    return <div>
        <NeshanMap
            ref={mapRef}
            onInit={onInit}
            mapKey={neshanToken}
            defaultType="neshan"
            center={{latitude: 35.7665394, longitude: 51.4749824}}
            style={{height: "100vh", width: "100%"}}
            zoom={15}
            traffic={true}
            poi={false}
        ></NeshanMap>
        <BottomSheet open={open}

                     blocking={false}
                     expandOnContentDrag={true}

                     snapPoints={({minHeight}) => minHeight}
        >
            <SheetContent className={styles.LocationBar}>
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
            </SheetContent>


        </BottomSheet>
    </div>
};

export default Maps;
