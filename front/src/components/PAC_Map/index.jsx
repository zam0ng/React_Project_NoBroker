    import React, { useState, useEffect , useRef} from 'react'

    import jsonp from 'jsonp'   
    import fetchJsonp from 'fetch-jsonp';   // 지진 데이터를 jsonp 방식으로 받아오기 위한 임포트


    const PAC_Map = () => {

    const mapRef = useRef();
    const autoCompleteRef = useRef();
        // [useRef 이해]
            // 주요 기능 중 하나는 getElementByID 처럼 'DOM 요소' 를 가져오는 것 
        // [useRef 문법]
            // 1) [그릇 만들기] : const autoCompleteRef = useRef(); : 뭔가를 가져와서 담을 '그릇' 을 만든다. 
            // 2) [담기] : <input id="autocomplete" ref={autoCompleteRef} />  : props 로 전달 -> autoCompleteRef 는 id 가 autocomplete 인 input 태그를 가리키게 된다. 
            // 3) [담은 걸 사용하기] : autoCompleteRef.current | new window.google.maps.places.Autocomplete(autoCompleteRef.current , options) 

    const [map, setMap] = useState(null);       // 지도 map 

    const earthquakeDataRef = useRef(null)       // 지진 데이터


    // useEffect(() => {
    //     async function eqfeed_callback() {
    //         try {
    //             const response = await fetch ("https://storage.googleapis.com/mapsdevsite/json/quakes.geo.json")
    //             earthquakeDataRef.current = await response.json()
    //             console.log("earthquakeDataRef.current 데이터" , earthquakeDataRef.current)
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
        
    //     eqfeed_callback()

    // }, []);

    // useEffect(() => {
    //     fetchJsonp('https://storage.googleapis.com/mapsdevsite/json/quakes.geo.json')
    //         .then(function(response) {
    //             return response.json();
    //         }).then(function(json) {
    //             earthquakeDataRef.current = json;
    //             console.log("earthquakeDataRef.current 데이터", earthquakeDataRef.current);
    //         }).catch(function(ex) {
    //             console.log('parsing failed', ex);
    //         });
    // }, []);

    
    // DB 에서 매물 데이터 가져오기 





    // 초기 맵 셋팅 
    useEffect( () => {
        const createdMap = new window.google.maps.Map(mapRef.current , {
            center: { lat: 40.749933, lng: -73.98633 },
            zoom: 13,
            mapTypeControl: false,
        });
        setMap(createdMap);
    } , [])

    // 지진 데이터 받아오기 | 되려나 😥😥 | 
    useEffect( () => {
        const eqfeed_callback = (results) => {
            for (const i = 0; i < results.features.length; i++){
                // 좌표가져와서 coords 에 저장
                const coords = results.features[i].geometry.coordinates;

                // 좌표마다, marker 찍기
                const latLng = new window.google.maps.LatLng(coords[0] , coords[1])
                const marker = new window.google.maps.Marker({
                    position : latLng,
                    map : map
                })
            }
        } 
    } , [] )
        // [모르겠음] 
            // , [ ] 이걸로 해야 하나? | , [results?]



    // 자동완성 + 데이터 레이어 추가 
    useEffect(() => {
        if(map){

            // autocomplete 객체 생성
            const autocomplete = new window.google.maps.places.Autocomplete(
                autoCompleteRef.current, {
                    // api 가 반환해줄 필드 지정
                    fields: ["formatted_address", "geometry", "name"],
                    strictBounds: false,
                    // types: ["establishment"]/
                }
                    // [해석]
                        // [바닐라 JS] const autocomplete = new google.maps.places.Autocomplete(input, options);
                        // Autocomplete 의 매개변수로 2개가 들어오는데, 리액트에서는, useRef 훅을 사용함 
                        // 따라서, input 매개변수는 autoCompleteRef.current 로써 전달되고 있음.
            );            
                // [추가 기능] api 반환 필드를 추가해줄 때
                    // autocomplete.setFields(['address_components', 'geometry', 'icon', 'name']);
            
            // 지도의 bounds 속성을 자동완성 객체에 바인딩
            autocomplete.bindTo("bounds", map);
                    // [기능] 
                        // autocomplete 의 'bounds' 속성을, map 객체의 'bounds' 속성에 '바인딩' 
                        // 그러면, '지도 영역 내 or 기반으로 추천' 해줌
                    // [문법] createdMap 변수가 setMap(createdMap) 훅에 의해 -> map 에 담김
            
            // info-window | 마커 위에 있는 정보 
            const infowindow = new window.google.maps.InfoWindow();


            // 추천 항목 클릭하면 벌어지는 일
            autocomplete.addListener('place_changed', () => {
                const marker = new window.google.maps.Marker({
                    map, 
                    anchorPoint : new window.google.maps.Point(0 , -29)
                })

            // autocomplete 객체에서 '사용자가 선택한 장소' 데이터 가져오기
            const place = autocomplete.getPlace();

                // place 에 어떤 데이터가 들어오는지 확인하기
                console.log('place 값의 유형' , place) 
                        // {
                        //     "formatted_address": "대한민국 서울특별시 강동구 천호동",
                        //     "geometry": {
                        //         "location": {
                        //             "lat": 37.5443765,
                        //             "lng": 127.1276202
                        //         },
                        //         "viewport": {
                        //             "south": 37.53555702641665,
                        //             "west": 127.1090669525435,
                        //             "north": 37.55080083966093,
                        //             "east": 127.1439526426217
                        //         }
                        //     },
                        //     "name": "천호동",
                        //     "html_attributions": []
                        // }
                
                // 데이터에 없는 값을 부르면 -> 오류 띄우기
                if (!place.geometry) {
                    window.alert("No details available for input: '" + place.name + "'");
                    return;
                }
                
                // 추천 사항 선택 하면 -> 해당 viewport 로 이동하게 하기
                if (place.geometry.viewport) {
                    map.fitBounds(place.geometry.viewport);
                } else {
                    map.setCenter(place.geometry.location);
                    map.setZoom(17);
                }

                // 선택된 위치에 마커 찍히게 하기
                marker.setPosition(place.geometry.location);
                // 이전 마커 지우고, 새로운 마커 찍기 | 마커 초기화 기능
                marker.setVisible(true);


                // info window
                    // 마커 위에 보여줄 데이터
                    infowindow.setContent(`<div> <strong> ${place.name} </strong> <br> ${place.formatted_address}</div>`);
                    // infowindow 를 map 과 marker 에 맵핑
                    infowindow.open(map, marker)

            });
        }
    }, [map])

    return (
        <>  
            {/* 검색 bar */}
            <input id="autocomplete" ref={autoCompleteRef} placeholder="Enter your address" type="text" /> 
            
            {/* 이 기능 없어도 가능해서 우선 껐음 */}
            {/* <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />             */}
            
            {/* 지도가 나오는 div */}
            <div id='map' ref={mapRef} style={{ height: '100vh', width: '100%' }}  />
        </>
    )    
    }
    
    // return <MapContainer ref={mapRef} /> 
        // 나오긴 하는데, return 에서 지금은 태그를 바로 쓰는게 직관적

    export default PAC_Map

