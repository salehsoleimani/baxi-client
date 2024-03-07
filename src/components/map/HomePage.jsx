import React, {useEffect, useRef, useState} from 'react';
import styles from './HomePage.module.css';
import {BottomSheet} from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import Button from '../ui/Button';
import Input from '../ui/Input';
import search from '../../assets/icons/search-normal.svg';
import location from '../../assets/icons/location.svg';
import NeshanMap from "@neshan-maps-platform/react-openlayers"
import {fromLonLat, toLonLat} from "@neshan-maps-platform/ol/proj";
import {Draw, Modify, Snap} from "@neshan-maps-platform/ol/interaction";
import {Icon, Style} from "@neshan-maps-platform/ol/style";
import SheetContent from "../ui/SheetContent.tsx";
import orgMarker from "../../assets/icons/marker_org.svg";
import destMarker from "../../assets/icons/marker_des.svg";
import VectorLayer from "@neshan-maps-platform/ol/layer/Vector";
import {Vector} from "@neshan-maps-platform/ol/source";

const HomePage = () => {
    const [open, setOpen] = useState(true);
    const [org, setOrg] = useState(null);
    const [dest, setDest] = useState(null);
    const [clickCount, setClickCount] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [buttonText, setButtonText] = useState('ثبت مبدا');
    const [orgDrawn, setOrgDrawn] = useState(false);
    const mapRef = useRef(null);

    const addDestinationMarkerDraw = () => {
        const destSource = new Vector();
        const destVector = new VectorLayer({
            source: destSource, style: new Style({
                image: new Icon({
                    anchor: [.75, 1], scale: 2, src: destMarker
                }), fill: '#000000',
            })
        });

        mapRef.current.map.addLayer(destVector);

        const modifyDest = new Modify({
            source: destSource, style: new Style({
                image: new Icon({
                    anchor: [.75, 1], scale: 2, src: destMarker
                }),
            }), pixelTolerance: 40
        });
        mapRef.current.map.addInteraction(modifyDest);
        modifyDest.on('modifyend', async function (event) {
            if (event.features && event.features.getLength() > 0) {
                const modifiedFeature = event.features.getArray()[0];
                if (modifiedFeature) {
                    const geometry = modifiedFeature.getGeometry();
                    if (geometry) {
                        const modifiedCoordinates = geometry.getCoordinates();
                        setDest(toLonLat(modifiedCoordinates));
                        const destAddress = await fetchAddress(toLonLat(modifiedCoordinates));
                        setInputValue(destAddress);
                    }
                }
            }
        });

        const drawDest = new Draw({
            source: destSource, type: "Point", style: new Style({
                image: new Icon({
                    anchor: [.75, 1], scale: 2, src: destMarker
                }),
            })
        });
        drawDest.on('drawend', async function (event) {
            const destCoordinates = toLonLat(event.feature.getGeometry().getCoordinates());
            setDest(destCoordinates);
            const destAddress = await fetchAddress(destCoordinates);
            setInputValue(destAddress);
            mapRef.current.map.removeInteraction(drawDest)
        });

        mapRef.current.map.addInteraction(drawDest);

        const destSnap = new Snap({source: destSource});
        mapRef.current.map.addInteraction(destSnap);
    };

    const onInit = (map) => {
        const source = new Vector();
        const vector = new VectorLayer({
            source: source, style: new Style({
                image: new Icon({
                    anchor: [.75, 1], scale: 2, src: orgMarker
                }), fill: '#000000',
            })
        });

        map.addLayer(vector);

        const modify = new Modify({
            source: source, style: new Style({
                image: new Icon({
                    anchor: [.75, 1], scale: 2, src: orgMarker
                }),
            }), pixelTolerance: 40
        });
        map.addInteraction(modify);
        modify.on('modifyend', async function (event) {
            if (event.features && event.features.getLength() > 0) {
                const modifiedFeature = event.features.getArray()[0];
                if (modifiedFeature) {
                    const geometry = modifiedFeature.getGeometry();
                    if (geometry) {
                        const modifiedCoordinates = geometry.getCoordinates();
                        setOrg(toLonLat(modifiedCoordinates));
                        setOrgDrawn(true)
                        const orgAddress = await fetchAddress(toLonLat(modifiedCoordinates));
                        setInputValue(orgAddress);
                    }
                }
            }
        });

        const draw = new Draw({
            source: source, type: "Point", style: new Style({
                image: new Icon({
                    anchor: [.75, 1], scale: 2, src: orgMarker
                }),
            })
        });
        draw.on('drawend', async function (event) {
            setOrg(toLonLat(event.feature.getGeometry().getCoordinates()));
            map.removeInteraction(draw);
            setOrgDrawn(true);
            const orgAddress = await fetchAddress(toLonLat(event.feature.getGeometry().getCoordinates()));
            setInputValue(orgAddress);
        });

        map.addInteraction(draw);
        const snap = new Snap({source: source});
        map.addInteraction(snap);
    };

    const handleClick = async () => {
        if (clickCount === 0) {
            setButtonText('ثبت مقصد');
            setClickCount(1);
            addDestinationMarkerDraw();
        } else if (clickCount === 1) {
            const destAddress = await fetchAddress(dest);
            setInputValue(destAddress);
            setButtonText('');
            setClickCount(0);
            setOrgDrawn(false);
        }
    };

    const fetchAddress = async (coordinates) => {
        const serviceToken = "service.56044bc8cffe4511b9742d9fbaa00da9"
        const url = `https://api.neshan.org/v1/reverse?lat=${coordinates[1]}&lng=${coordinates[0]}`;
        const response = await fetch(url, {
            headers: {
                'Api-Key': serviceToken
            }
        });
        const data = await response.json();
        return data.address;
    };

    useEffect(() => {
        if (mapRef.current?.map) {
            // Additional map initialization if needed
        }
    }, []);

    return (<div>
        <NeshanMap
            className={styles.map}
            mapKey='web.11c86d9ad4654f708f74425d9a297b9f'
            defaultType="dreamy-gold"
            center={{latitude: 34.7983, longitude: 48.5148}}
            onInit={onInit}
            zoom={16}
            ref={mapRef}
            traffic={true}
            poi={false}
        ></NeshanMap>
        <BottomSheet
            open={open}
            blocking={false}
            expandOnContentDrag={true}
            snapPoints={({minHeight}) => minHeight}
        >
            <SheetContent className={styles.LocationBar}>
                <Input
                    placeholder="جستجوی..."
                    className={styles.inputContainer}
                    type="search"
                    defaultValue={inputValue}
                >
                    <img src={search} alt="search"/>
                    <img src={location} alt="location"/>
                </Input>
                <div className={styles.savedLocations}>
                    <div className={styles.savedLocation}>
                        <span>خانه</span>
                    </div>
                    <div className={styles.savedLocation}>
                        <span>خانه</span>
                    </div>
                </div>
                {orgDrawn && (<Button type="filled" className={styles.bottomSheetButton} onClick={handleClick}>
                    <span className="button">{buttonText}</span>
                </Button>)}
            </SheetContent>
        </BottomSheet>
    </div>);
};

export default HomePage;
