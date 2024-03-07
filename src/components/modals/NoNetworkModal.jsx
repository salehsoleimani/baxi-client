import React, {useState, useEffect} from 'react';
import {BottomSheet} from "react-spring-bottom-sheet";
import SheetContent from "../ui/SheetContent.jsx";
import Button from "../ui/Button";
import noNetworkImg from '../../assets/img/no_network.png'
import styles from './NoNetworkModal.css'


const NoNetworkModal = (props) => {
    const [isOnline, setOnline] = useState(true);

    useEffect(() => {
        setOnline(navigator.onLine)
    }, [])

    window.addEventListener('online', () => {
        setOnline(true)
    });

    window.addEventListener('offline', () => {
        setOnline(false)
    });

    if (isOnline) {
        return (
            props.children
        )
    } else {
        return (
            <BottomSheet open={!isOnline}
                         blocking={true}
                // expandOnContentDrag={true}
                         snapPoints={({minHeight}) => minHeight}
            >
                <SheetContent>
                    <p
                        className={`sub-headline ${styles.title}`}>
                        به اینترنت وصل نیستید
                    </p>
                    <img
                        src={noNetworkImg}
                        width="191px"
                        height="129px"
                        style={{
                            margin: "0 auto",
                            justifySelf: "center",
                            marginBlock: "24px"
                        }}
                        alt="no_network"
                    />
                    <p className="sub-headline">
                        برای استفاده از بکسی به اینترنت متصل شوید
                    </p>
                    <Button
                        type="text"
                        className={styles.button}>
                        تلاش مجدد
                    </Button>
                </SheetContent>

            </BottomSheet>
        )
    }
}

export default NoNetworkModal;