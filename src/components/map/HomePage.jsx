import React, {useEffect, useRef} from 'react';
import styles from './HomePage.module.css'
import {BottomSheet} from "react-spring-bottom-sheet";
import 'react-spring-bottom-sheet/dist/style.css'
import {useState} from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import search from "../../assets/icons/search-normal.svg";
import location from "../../assets/icons/location.svg";
import NeshanMap from "@neshan-maps-platform/react-openlayers"
import * as layer from '@neshan-maps-platform/ol/layer'
import * as source from '@neshan-maps-platform/ol/source'
import {Feature} from "@neshan-maps-platform/ol";
import {fromLonLat} from "@neshan-maps-platform/ol/proj";
import {Point} from "@neshan-maps-platform/ol/geom";
import {Fill, Stroke} from "@neshan-maps-platform/ol/style";
import SheetContent from "../ui/SheetContent";

const Maps = () => {
    const [open, setOpen] = useState(true);
    const neshanToken = 'web.11c86d9ad4654f708f74425d9a297b9f';

    const mapRef = useRef(null)

    const onInit = (map) => {
        // map.setMapType("osm-bright")
        // map.switchTrafficLayer(true)
        const stroke = new Stroke({ color: 'black', width: 2 });
        const fill = new Fill({ color: 'green' });

// add custom marker
        var marker = new Feature({
            geometry: new Point(fromLonLat([51.338076, 35.699756])),
            name: 'میدان آزادی',
        });

        // marker.setStyle(new OlStyle({
        //     image: new Icon({
        //         anchor: [0.5, 1],
        //         scale: 0.5,
        //         src: 'marker-icon-2x-red.png'
        //     })
        // }));


// add custom marker
        var marker2 = new Feature({
            geometry: new Point(fromLonLat([51.336247, 35.712362]))
        });

        var vectorSource = new source.Vector({
            features: [marker, marker2]
        });

        var vectorLayer = new layer.Vector({
            source: vectorSource
        });

        map.addLayer(vectorLayer);

        console.log(map)
    }

    useEffect(() => {
        if (mapRef.current?.map) {
            // mapRef.current?.map.switchTrafficLayer(true)
            // mapRef.current?.map.setMapType("standard-night")
        }
    }, [])

    return <div>
        <NeshanMap
            className={styles.map}
            mapKey={neshanToken}
            defaultType="dreamy-gold"
            center={{latitude:34.7983, longitude: 48.5148}}
            onInit={onInit}
            zoom={16}
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
