import React, {useEffect, useRef} from 'react';
import styles from './HomePage.module.css';
import {BottomSheet} from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import {useState} from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import search from '../../assets/icons/search-normal.svg';
import location from '../../assets/icons/location.svg';
import NeshanMap from "@neshan-maps-platform/react-openlayers"
import * as layer from '@neshan-maps-platform/ol/layer'
import * as source from '@neshan-maps-platform/ol/source'
import {Feature as getOverlay, Feature} from "@neshan-maps-platform/ol";
import {fromLonLat} from "@neshan-maps-platform/ol/proj";
import {Point} from "@neshan-maps-platform/ol/geom";
import {defaults, Draw, Modify, Pointer, Select, Snap} from "@neshan-maps-platform/ol/interaction";
import {Icon, Style, Image, IconImage, Fill} from "@neshan-maps-platform/ol/style";
import SheetContent from "../ui/SheetContent.tsx";
import orgMarker from "../../assets/icons/marker_org.svg"
// import {renderFeature} from "@neshan-maps-platform/ol/renderer/vector";
import * as circleFeature from "@neshan-maps-platform/ol/proj/projections";
import {renderFeature} from "@neshan-maps-platform/ol/renderer/vector";
import VectorLayer from "@neshan-maps-platform/ol/layer/Vector";
import {Vector} from "@neshan-maps-platform/ol/source";
// import {Vector as VectorSource} from "@neshan-maps-platform/ol/source";
// import {renderFeature} from "@neshan-maps-platform/ol/renderer/canvas/VectorLayer"

const HomePage = () => {
    const [open, setOpen] = useState(true);
    const neshanToken = 'web.11c86d9ad4654f708f74425d9a297b9f';

    const mapRef = useRef(null)

    const onInit = (map) => {
        const newMarker = new Feature({
            geometry: new Point(fromLonLat([48.5148, 34.7983])), name: 'userLocation',
        });

        newMarker.setStyle(new Style({
            image: new Icon({
                anchor: [.75, 1], scale: 2, src: orgMarker
            })
        }));

        const source = new Vector();
        // var vectorSource = new source.Vector({
        // features: [newMarker]
        // });
        const vector = new VectorLayer({
            source: source,

            style: new Style({
                image: new Icon({
                    anchor: [.75, 1], scale: 2, src: orgMarker
                }),

                fill: '#000000',
            })

        })


        map.addLayer(vector);

        const modify = new Modify({source: source});
        map.addInteraction(modify);

        function addInteractions() {
            var defaultEditStyle = new getOverlay().getStyleFunction();
            var drawing = false
            const draw = new Draw({
                source: source,
                type: "Point",
                style:
                    new Style({
                        image: new Icon({
                            anchor: [.75, 1], scale: 2, src: orgMarker
                        }),
                    })
            });
            draw.on('drawstart', function () {
                drawing = true;
            });
            draw.on('drawend', function () {
                drawing = false;
            });
            map.addInteraction(draw);
            const snap = new Snap({source: source});
            map.addInteraction(snap);
        }

        addInteractions();


        // const pointerInteraction = new Pointer({
        //     handleDownEvent: function (evt) {
        //         console.log('down');
        //         var layerFilter = function (layer) {
        //             return layer === newMarker;
        //         }
        //
        //         const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
        //             return feature;
        //         }, this, layerFilter, this);
        //         if (feature === newMarker) {
        //             this.feature = feature;
        //             this.coordinate = evt.coordinate;
        //         }
        //         return !!feature;
        //     }, handleDragEvent: function (evt) {
        //         console.log('drag');
        //
        //         if (this.feature) {
        //             const deltaX = evt.coordinate[0] - this.coordinate[0];
        //             const deltaY = evt.coordinate[1] - this.coordinate[1];
        //             const geometry = this.feature.getGeometry();
        //             geometry.translate(deltaX, deltaY);
        //             this.coordinate = evt.coordinate;
        //         }
        //     }, handleUpEvent: function () {
        //         console.log('up');
        //
        //         this.feature = null;
        //         return false;
        //     },
        // });


        // const draw = new Draw({
        //     style: new Style({
        //         image: new Icon({
        //             anchor: [.75, 1], scale: 2, src: orgMarker
        //         }),
        //         fill: new Icon({
        //             anchor: [.75, 1], scale: 2, src: orgMarker
        //         }),
        //     }),
        //     // source: vectorSource,
        //     type: "Point",
        // });


        // map.addInteraction(draw)
    }

    useEffect(() => {
        if (mapRef.current?.map) {
            // mapRef.current?.map.switchTrafficLayer(true)
            // mapRef.current?.map.setMapType("standard-night")
        }
    }, []);

    return (<div>
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
                <Button type="filled" className={styles.bottomSheetButton}>
                    <span className="button2">تایید مبدا</span>
                </Button>
            </SheetContent>
        </BottomSheet>
    </div>);
};

export default HomePage;
