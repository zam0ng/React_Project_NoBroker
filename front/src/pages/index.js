import { useMemo , useEffect , useRef, useState} from "react";

import {GooleMap , useLoadScript, Marker} from '@googlemaps/react-wrapper'


export default function Home() {

    const [map , setMap] = useState(null);
    const ref = useRef();

    useEffect( () => {
        const newMap = new window.google.maps.Map(ref.current, {
            center : { lat: 37.569227, lng: 126.9777256},
            zoom : 16,
        })

        setMap(newMap)

    } , [] )


        return (
            <div ref={ref} id="map" style={{width:"400px" , height:"400px"}} > </div>
        )
    }




