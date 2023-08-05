    import React , {useEffect , useRef} from 'react'

    import  MarkerClusterer from "@googlemaps/markerclusterer";


    // 리액트 스타일로 변경 시도 
    const GoogleMap_2_1 = () => {

        // useRef 선언 | 저장한 공간 만들어두기 
        const mapRef = useRef(null);
    
        useEffect(() => {

            //  Google Maps JavaScript API가 전역 객체 window 에 google 을 할당
            const google = window.google;
        
            // 위도 경도 위치 
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


            // 지도의 '초기 위치' 와 '확대 레벨' 설정 
            const map = new google.maps.Map(mapRef.current, {
                zoom: 3,
                center: { lat: -28.024, lng: 140.887 },
            });
            /* [해석]
                - new google.maps.Map 
                    : new google.maps.Map 클래스의 새 인스턴스를 생성한다. 
                    : 구글 지도와 관련된 모든 기능들을 제어
                - mapRef.current 
                    : return <div id="map" ref={mapRef} 여기에서 mapRef 가 div 를 가리키게 해두었음. 
                - 나머지는 화면 설정 및 위도, 경도      
            */
        
            // '특정 위치에 표시되는 정보 창'
            const infoWindow = new google.maps.InfoWindow({
                content: "",
                disableAutoPan: true,
            });
            /* 
                [해석]
                    - new google.maps.InfoWindow : 새로운 인스턴스 생성 
                    - content: "" 
                        : HTML 콘텐츠나 일반 텍스트를 설정
                        : 향후, 마커 클릭 이벤트 -> infoWindow.setContent(label) 을 사용해서 내용 업데이트 
                    - disableAutoPan: true 
                        : '정보 창이 열릴 때, 지도가 자동으로 이동, 정보 창이 완전히 보이는 기능' 이 꺼짐'
                        : 지금 자리에서 정보창만 딱 켜지는 역할 
            */
        
            // 마커에 '이름표' 붙이기
                // 이름표들이 담기는 통
                    const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

                // [map 메서드 돌리기] '위치 정보' 에 '이름표' 붙이기
                    const markers = locations.map((position, i) => {
                        const label = labels[i % labels.length];
                        const marker = new google.maps.Marker({
                            position,
                            label,
                            // [기능] 각각의 marker 에 1) 위도 경도 2) 이름표 가 붙는 순간 
                        });                    
                        // [해석] 위치 정보가, 어떤 순서로 정렬되어 있느냐에 따라서 다르게 붙일 수 있을 것 같아

                    // 마커 클릭시 실행되는 이벤트
                        marker.addListener("click", () => {

                            // 마커 클릭시 보이는 콘텐츠
                            infoWindow.setContent(label);   // 위에서 설정한 이름표가 그대로 보임
                            // infoWindow.setContent("test");   // test 가 일괄적으로 보임
                                // [해석] 
                                    // infoWindow.setContent : 해당 마커를 클릭하면, 해당 마커의 창이 떠오른다. 거기에 뭘 보여줄거냐

                            infoWindow.open(map, marker);
                                // [해석]
                                    // infoWindow.open : 정보창을 엽니다. 
                                    // map : 
                        });
                        return marker;
                    });
                        // 마커 잘 붙었는지 확인 
                            console.log("마커에 라벨 붙은 것들" , markers)


            // 클러스터로 그룹화 하기
                new window.MarkerClusterer(map, markers,  {
                    imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m', 
                    // or your custom path : 커스텀에 필요함 ⭐⭐
                });
                }, []);
                    // [해석] 초기 위치(map) 에서, map 메서드로 만든 markers 들이,  그룹화 되어서 보임
            
        return <div id="map" ref={mapRef} style={{ width: "100%", height: "400px" }} />;
    };
    export default GoogleMap_2_1