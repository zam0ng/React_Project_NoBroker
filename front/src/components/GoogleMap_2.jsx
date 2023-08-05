import React , {useEffect , useRef} from 'react'

import { MarkerClusterer } from "@googlemaps/markerclusterer";

// 구글 공식 문서 보고 gpt 이용해서 작성 | 마커 클러스터링
    // https://developers.google.com/maps/documentation/javascript/marker-clustering?hl=ko 여기임 
    


const GoogleMap_2 = () => {

  const mapRef = useRef(null);

  
  useEffect(() => {
    // const map = google.maps;/

    const google = window.google
        // ⭐⭐⭐⭐⭐ 이 문장에 에러를 해결해줌 
        // 에러 메시지 : Line 21:27:  'google' is not defined  no-undef
  
      const MarkerClusterer = window.MarkerClusterer;   
        // Google Map API V3- MarkerClusterer undefined 오류 메시지를 여기서 해결
        // index.html 에서 설치하고, 여기에서 받아와서 그려주기

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


      function initMap() {
        const map = new google.maps.Map(document.getElementById("map"), {
          zoom: 3,
          center: { lat: -28.024, lng: 140.887 },
        });


      // 스택 2번째 대답 
      let oldZoom = null;
      let oldCenter = null;
      google.maps.event.addListenerOnce(map, "zoom_changed", function() { oldZoom = map.getZoom(); });
      google.maps.event.addListenerOnce(map, "center_changed", function() { oldCenter = map.getCenter(); });



        const infoWindow = new google.maps.InfoWindow({
          content: "",
          disableAutoPan: true,
        });
        // Create an array of alphabetical characters used to label the markers.
        const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        // Add some markers to the map.
        const markers = locations.map((position, i) => {
          const label = labels[i % labels.length];
          const marker = new google.maps.Marker({
            position,
            label,
          });
      
          // markers can only be keyboard focusable when they have click listeners
          // open info window when marker is clicked
          marker.addListener("click", () => {
            infoWindow.setContent(label);
            infoWindow.open(map, marker);
          });
          return marker;
        });
      
        // Add a marker clusterer to manage the markers.
        
        const markerCluster = new MarkerClusterer({ map, markers });

        new MarkerClusterer(markers, map, {
          imagePath : 
          "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
        } );
      }      
      
      window.initMap = initMap;    
        initMap();

      }, []);


  return <div id="map" ref={mapRef} style={{ width: "100%", height: "400px" }} />;

}

export default GoogleMap_2;
