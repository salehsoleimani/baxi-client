import { useEffect, useRef, useState } from "react";
import NeshanMap from "@neshan-maps-platform/react-openlayers";
import LocationBar from "./LocationBar";
import styles from './Map.module.css';
import ol from '@neshan-maps-platform/react-openlayers';
// import { Point } from 'ol/geom';

const Maps = () => {
    // const mapRef = useRef(null);
    // const [marker, setMarker] = useState(null);

    // useEffect(() => {
    //     const map = mapRef.current; // Directly access the map instance

    //     if (map) {
    //         // Create a new marker feature
    //         const markerFeature = new ol.Feature({
    //             geometry: new ol.geom.Point(ol.proj.fromLonLat([51.4749824, 35.7665394])),
    //         });

    //         // Create a marker style
    //         const markerStyle = new ol.style.Style({
    //             image: new ol.style.Icon({
    //                 src: 'path/to/your/marker/icon.png',
    //                 anchor: [0.5, 1],
    //             }),
    //         });

    //         markerFeature.setStyle(markerStyle);

    //         // Add the marker to the map
    //         const vectorSource = new ol.source.Vector({
    //             features: [markerFeature],
    //         });

    //         const vectorLayer = new ol.layer.Vector({
    //             source: vectorSource,
    //         });

    //         map.addLayer(vectorLayer);

    //         setMarker(markerFeature);

    //         // Update marker position when the map is moved
    //         map.on('moveend', () => {
    //             const center = map.getView().getCenter();
    //             markerFeature.setGeometry(new ol.geom.Point(center));
    //             console.log('Marker moved to:', center);
    //         });

    //         // Move marker to the clicked position
    //         map.on('click', (event) => {
    //             const coordinate = event.coordinate;
    //             markerFeature.setGeometry(new ol.geom.Point(coordinate));
    //             console.log('Marker set to:', coordinate);
    //         });
    //     }
    // }, []);

    return (
        <div>
            <NeshanMap
                mapKey="web.11c86d9ad4654f708f74425d9a297b9f"
                center={{ latitude: 35.7665394, longitude: 51.4749824 }}
                zoom={14}
                className={styles.map}
                id='map'
                // ref={mapRef}
            />
            <LocationBar />
        </div>
    );
};

export default Maps;
