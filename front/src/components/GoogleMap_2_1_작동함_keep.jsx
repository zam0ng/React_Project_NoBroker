    import React , {useEffect , useRef} from 'react'

    import { MarkerClusterer } from "@googlemaps/markerclusterer";


    // 작동함 🔵 
    const GoogleMap_2_1 = () => {

        const mapRef = useRef(null);
        /* [useRef 이해]
            - 변수 VS useState, useRef 훅 비교하기 
            1) 재렌더링 되면 변수 안에 있던 데이터는 사라진다. 
            2) 재렌더링 되면, useState, useRef 훅 안에 있는 데이터는 사라지지 않는다. 

            - useState, useRef 훅 비교 하기 
            1) useState 의 경우, '상태값(state)' 이 변경되면 -> 재렌더링 된다. 
            2) useRef 의 경우, 값이 변경되어도, 재 렌더링이 되지 않는다. 
        */
    
        useEffect(() => {
        const google = window.google;
    
        const locations = [
            { lat: -31.56391, lng: 147.154312 },
            { lat: -33.718234, lng: 150.363181 },
            { lat: -33.727111, lng: 150.371124 },
            { lat: -33.848588, lng: 151.209834 },
            { lat: -33.851702, lng: 151.216968 },
            { lat: -34.671264, lng: 150.863657 },
            { lat: -35.304724, lng: 148.662905 },
            { lat: -36.817685, lng: 175.699196 },
            { lat: -36.828611, lng: 175.790222 },
            { lat: -37.75, lng: 145.116667 },
            { lat: -37.759859, lng: 145.128708 },
            { lat: -37.765015, lng: 145.133858 },
            { lat: -37.770104, lng: 145.143299 },
            { lat: -37.7737, lng: 145.145187 },
            { lat: -37.774785, lng: 145.137978 },
            { lat: -37.819616, lng: 144.968119 },
            { lat: -38.330766, lng: 144.695692 },
            { lat: -39.927193, lng: 175.053218 },
            { lat: -41.330162, lng: 174.865694 },
            { lat: -42.734358, lng: 147.439506 },
            { lat: -42.734358, lng: 147.501315 },
            { lat: -42.735258, lng: 147.438 },
            { lat: -43.999792, lng: 170.463352 },
        ];  
        
        const map = new google.maps.Map(mapRef.current, {
            zoom: 3,
            center: { lat: -28.024, lng: 140.887 },
        });
    
        const infoWindow = new google.maps.InfoWindow({
            content: "",
            disableAutoPan: true,
        });
    
        const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
        const markers = locations.map((position, i) => {
            const label = labels[i % labels.length];
            const marker = new google.maps.Marker({
            position,
            label,
            });
    
            marker.addListener("click", () => {
            infoWindow.setContent(label);
            infoWindow.open(map, marker);
            });
            return marker;
        });
    
        new window.MarkerClusterer(map, markers,  {
            imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m', // or your custom path
        });
        }, []);
    
        return <div id="map" ref={mapRef} style={{ width: "100%", height: "400px" }} />;
    };
    export default GoogleMap_2_1