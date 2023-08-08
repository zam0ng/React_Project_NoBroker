import React, { useCallback, useEffect, useMemo, useState } from 'react'
import axios from 'axios';

const {kakao} =window;

const MapApi = ({placeAddress, setIsNone}) => {

    const [lng,setLng] =useState(0);
    const [lat,setLat] =useState(0);
    const [mapLoaded ,setMapLoaded] = useState(false);

    console.log("placeAddress");
    console.log(placeAddress); // 내가 검색한 주소 들어옴

    const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(
    placeAddress
    )}`;

    axios.get(url, {
    headers: {
      Authorization: `KakaoAK ${process.env.REACT_APP_REST_API_KEY}`,
    },
    }).then((e)=>{
        const data = e.data;
        setLng(data.documents[0].x); // 경도(lng)
        setLat(data.documents[0].y); // 위도(lat)
        setMapLoaded(true);
    }).catch((err)=>{
        console.log(err);
    });

    useEffect(()=>{

        console.log("------------------mapLoaded");
        console.log(mapLoaded);
        console.log(lat)
        console.log(lng)
        if(mapLoaded){
        setIsNone("none");

        const container = document.getElementById('map');
        const options = {
            center : new kakao.maps.LatLng(lat, lng),
            level :3
        };
        const map = new kakao.maps.Map(container, options);
        var geocoder = new kakao.maps.services.Geocoder();

        var coords = new kakao.maps.LatLng(lat, lng);

        container.style.display = "block";
        map.relayout();

        map.setCenter(coords);
        // 마커를 결과값으로 받은 위치로 옮긴다.
        
        var marker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(lat, lng),
            map: map
        });

        marker.setPosition(coords)

    }

    },[lat,lng,mapLoaded]);

  return (
    <>
    {/* <input type="text" id="sample5_address" placeholder="주소"/> */}
    <div id='map' style={{width:'460px',height:'400px',display:'none'}}></div>
    </>
  )
}

export default MapApi