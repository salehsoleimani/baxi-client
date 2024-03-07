import React, {useEffect, useRef, useState} from 'react';
import styles from './HomePage.module.css';
import {BottomSheet} from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import Button from '../ui/Button';
import Input from '../ui/Input';
import search from '../../assets/icons/search-normal.svg';
import location from '../../assets/icons/location.svg';
import NeshanMap from "@neshan-maps-platform/react-openlayers"
import {Feature} from "@neshan-maps-platform/ol";
import {fromLonLat, toLonLat} from "@neshan-maps-platform/ol/proj";
import {Point} from "@neshan-maps-platform/ol/geom";
import {defaults, Draw, Modify, Snap} from "@neshan-maps-platform/ol/interaction";
import {Icon, Style} from "@neshan-maps-platform/ol/style";
import SheetContent from "../ui/SheetContent.tsx";
import orgMarker from "../../assets/icons/marker_org.svg";
import destMarker from "../../assets/icons/marker_des.svg";
import VectorLayer from "@neshan-maps-platform/ol/layer/Vector";
import {Vector} from "@neshan-maps-platform/ol/source";

const HomePage = () => {
    const [open, setOpen] = useState(true);
    const neshanToken = 'web.11c86d9ad4654f708f74425d9a297b9f';
    const [org, setOrg] = useState(null);
    const [dest, setDest] = useState(null);
    const [clickCount, setClickCount] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [buttonText, setButtonText] = useState('تایید مبدا');
    const mapRef = useRef(null);

    const onInit = (map) => {
        const newMarker = new Feature({
            geometry: new Point(fromLonLat([48.5148, 34.7983])),
            name: 'userLocation',
        });

        newMarker.setStyle(new Style({
            image: new Icon({
                anchor: [.75, 1], scale: 2, src: orgMarker
            })
        }));

        const source = new Vector();
        const vector = new VectorLayer({
            source: source, style: new Style({
                image: new Icon({
                    anchor: [.75, 1], scale: 2, src: orgMarker
                }), fill: '#000000',
            })
        });

        const destSource = new Vector();
        const destVector = new VectorLayer({
            source: destSource, style: new Style({
                image: new Icon({
                    anchor: [.75, 1], scale: 2, src: destMarker
                }), fill: '#000000',
            })
        });

        map.addLayer(vector);
        map.addLayer(destVector);

        const modify = new Modify({
            source: source, style: new Style({
                image: new Icon({
                    anchor: [.75, 1], scale: 2, src: orgMarker
                }),
            }), pixelTolerance: 40
        });
        map.addInteraction(modify);

        const modifyDest = new Modify({
            source: destSource, style: new Style({
                image: new Icon({
                    anchor: [.75, 1], scale: 2, src: destMarker
                }),
            }), pixelTolerance: 40
        });
        map.addInteraction(modifyDest);

        function addInteractions() {
            const draw = new Draw({
                source: source, type: "Point", style: new Style({
                    image: new Icon({
                        anchor: [.75, 1], scale: 2, src: orgMarker
                    }),
                })
            });
            draw.on('drawstart', function () {
            });
            draw.on('drawend', function (event) {
                const point = event.feature.getGeometry().getCoordinates()
                const point_in_lang = toLonLat(point);
                if (clickCount === 0) {
                    setOrg(point_in_lang);
                    map.removeInteraction(draw);
                    const newDraw = new Draw({
                        source: destSource, type: "Point", style: new Style({
                            image: new Icon({
                                anchor: [.75, 1], scale: 2, src: destMarker
                            }),
                        })
                    });
                    newDraw.on('drawstart', function () {
                    });
                    newDraw.on('drawend', function (event) {
                        const point = event.feature.getGeometry().getCoordinates()
                        const point_in_lang = toLonLat(point);
                        setDest(point_in_lang);
                        map.removeInteraction(newDraw);
                    });
                    map.addInteraction(newDraw);
                    // setClickCount(1);
                } else if (clickCount === 1) {
                    setDest(event.feature.getGeometry().getCoordinates());
                    map.removeInteraction(draw);
                }
            });

            map.addInteraction(draw);
            const snap = new Snap({source: source});
            map.addInteraction(snap);

            const destSnap = new Snap({source: destSource});
            map.addInteraction(destSnap);
        }

        addInteractions();
    };

    const handleClick = async () => {
        if (clickCount === 0) {
            const orgAddress = await fetchAddress(org);
            setInputValue(orgAddress);
            setButtonText('انتخاب مقصد');
            setClickCount(1);
        } else if (clickCount === 1) {
            const destAddress = await fetchAddress(dest);
            setInputValue(destAddress);
            setButtonText('');
            setClickCount(0);
        }
    };

    const fetchAddress = async (coordinates) => {
        console.log(coordinates)
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

    return (
        <div>
            <NeshanMap
                className={styles.map}
                mapKey={neshanToken}
                defaultType="dreamy-gold"
                center={{latitude: 34.7983, longitude: 48.5148}}
                onInit={onInit}
                zoom={16}
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
                            <span>خونه</span>
                        </div>
                        <div className={styles.savedLocation}>
                            <span>خونه</span>
                        </div>
                    </div>
                    {buttonText && (<Button type="filled" className={styles.bottomSheetButton} onClick={handleClick}>
                        <span className="button">{buttonText}</span>
                    </Button>)}
                </SheetContent>
            </BottomSheet>
        </div>
    );
};

export default HomePage;
