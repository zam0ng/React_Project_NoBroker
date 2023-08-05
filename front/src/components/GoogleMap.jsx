import React , {useEffect , useRef} from 'react'


// 구글 공식 문서 보고 gpt 이용해서 작성 
    // 웹사이트에 마커가 포함된 Google 지도 추가
    // https://developers.google.com/maps/documentation/javascript/adding-a-google-map?hl=ko 여기임 
    // 아직 마커가 안 되는 버전


const GoogleMap = () => {

    const mapRef = useRef(null);

    useEffect(() => {

        async function initMap() {

        // ⭐⭐⭐⭐⭐ 이 문장에 에러를 해결해줌 
            // 에러 메시지 : Line 21:27:  'google' is not defined  no-undef
        const google = window.google

          // The location of Uluru
          const position = { lat: -25.344, lng: 131.031 };
          
          // Assuming the libraries are loaded globally, you may access them directly
          const { Map } = google.maps;
          
          // If you have a custom library like "AdvancedMarkerView", make sure it's imported and used accordingly
          
          // The map, centered at Uluru
          const map = new Map(mapRef.current, {
            zoom: 4,
            center: position,
            mapId: "DEMO_MAP_ID",
          });
    
          // The marker, positioned at Uluru
          // Replace with appropriate code if using a custom marker library
          const marker = new google.maps.Marker({
            map: map,
            position: position,
            title: "Uluru",
          });
        }
    
        initMap();

      }, []);


  return <div id="map" ref={mapRef} style={{ width: "100%", height: "400px" }} />;

}

export default GoogleMap;
