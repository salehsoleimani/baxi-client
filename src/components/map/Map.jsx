import React, {useEffect, useRef} from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import {fromLonLat, toLonLat} from 'ol/proj'; // Import the necessary projection functions
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import {Icon, Style} from 'ol/style';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {OSM, Vector as VectorSource} from 'ol/source';
import LocationBar from "./LocationBar";
import styles from './Map.module.css'
import {BottomSheet} from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
import {useState} from "react";
import SheetContent from "../ui/SheetContent.tsx";
import Expandable from "../ui/Expandable.tsx";
import Button from "../ui/Button";

const Maps = () => {
    const mapRef = useRef(null);
    const [open, setOpen] = useState(true);

    useEffect(() => {
        const neshanToken = 'web.11c86d9ad4654f708f74425d9a297b9f';

        // Create a new instance of OpenLayers Map
        const map = new Map({
            target: mapRef.current,
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
            ],
            view: new View({
                center: fromLonLat([51.388973, 35.689198]), // Tehran coordinates as an example
                zoom: 12,
            }),
        });

        // Create a vector layer to add the icon
        const vectorLayer = new VectorLayer({
            source: new VectorSource(),
        });
        map.addLayer(vectorLayer);

        // Create a point feature representing your icon
        const iconFeature = new Feature({
            geometry: new Point(fromLonLat([51.388973, 35.689198])), // Default location
        });

        // Define the style for the icon
        const iconStyle = new Style({
            image: new Icon({
                anchor: [0.5, 46],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                src: '../../assets/glass-icons/location.png', // URL to your icon image
            }),
        });

        iconFeature.setStyle(iconStyle);
        vectorLayer.getSource().addFeature(iconFeature);

        // Handle map click event
        map.on('click', (event) => {
            const clickedCoordinate = event.coordinate;
            const lonLat = toLonLat(clickedCoordinate); // Convert clicked coordinate to lon/lat
            console.log('Clicked Coordinates:', lonLat);
        });

        // Cleanup function
        return () => {
            map.setTarget(null);
        };
    }, []);

    return <div>
        <div ref={mapRef} className={`map ${styles.map}`} style={{width: '100vw', height: '400vh'}}/>
        <BottomSheet open={open}

                     blocking={false}
                     expandOnContentDrag={true}

                     snapPoints={({minHeight}) => minHeight}
        >
            <SheetContent>
                <LocationBar/>
                {/*<p>*/}
                {/*    Using lets users close the sheet by swiping*/}
                {/*    it down, tapping on the backdrop or by hitting on*/}
                {/*    their keyboard.*/}
                {/*</p>*/}
                {/*<Expandable>*/}

                    {/*<div className="bg-gray-200 block rounded-md h-10 w-full my-10"/>*/}
                    {/*<p>*/}
                    {/*    The height adjustment is done automatically, it just works™!*/}
                    {/*</p>*/}
                    {/*<div className="bg-gray-200 block rounded-md h-10 w-full my-10"/>*/}
                {/*</Expandable>*/}
                {/*<Button onClick={onDismiss} className="w-full">*/}
                {/*    Dismiss*/}
                {/*</Button>*/}
            </SheetContent>


        </BottomSheet>
    </div>
};

export default Maps;
