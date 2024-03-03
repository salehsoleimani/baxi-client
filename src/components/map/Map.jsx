import { useEffect, useRef } from "react"
import { Map } from "@neshan-maps-platform/ol"
import NeshanMap, { NeshanMapRef } from "@neshan-maps-platform/react-openlayers"
import styles from './Map.module.css'
import LocationBar from "./LocationBar"
import ol from '@neshan-maps-platform/react-openlayers'


const Maps = () => {

    // const key = 'web.11c86d9ad4654f708f74425d9a297b9f';

    // const attribution = new ol.control.Attribution({
    //     collapsible: false,
    // });

    // const source = new ol.source.TileJSON({
    //     url: `https://api.maptiler.com/maps/streets-v2/tiles.json?key=${key}`, // source URL
    //     tileSize: 512,
    //     crossOrigin: 'anonymous'
    // });

    // const map = new ol.Map({
    //     layers: [
    //         new ol.layer.Tile({
    //             source: source
    //         })
    //     ],
    //     controls: ol.control.defaults.defaults({ attribution: false }).extend([attribution]),
    //     target: 'map',
    //     view: new ol.View({
    //         constrainResolution: true,
    //         center: ol.proj.fromLonLat([12.550343, 55.665957]), // starting position [lng, lat]
    //         zoom: 10 // starting zoom
    //     })
    // });
    return (
        <div>
            <NeshanMap
                mapKey="web.11c86d9ad4654f708f74425d9a297b9f"
                center={{ latitude: 35.7665394, longitude: 51.4749824 }}
                zoom={14}
                className={styles.map}
                id= 'map'
            ></NeshanMap>
            <LocationBar />
        </div>
    )
}

export default Maps;