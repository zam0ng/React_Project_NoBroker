        import React, { useState, useEffect , useRef} from 'react'
        import axios from 'axios';
        import { useQuery } from 'react-query';
        import { MarkerClusterer } from "@googlemaps/markerclusterer";



        const PAC_Map = () => {

        const mapRef = useRef();
        const autoCompleteRef = useRef();
            // [useRef 이해]
                // 주요 기능 중 하나는 getElementByID 처럼 'DOM 요소' 를 가져오는 것 
            // [useRef 문법]
                // 1) [그릇 만들기] : const autoCompleteRef = useRef(); : 뭔가를 가져와서 담을 '그릇' 을 만든다. 
                // 2) [담기] : <input id="autocomplete" ref={autoCompleteRef} />  : props 로 전달 -> autoCompleteRef 는 id 가 autocomplete 인 input 태그를 가리키게 된다. 
                // 3) [담은 걸 사용하기] : autoCompleteRef.current | new window.google.maps.places.Autocomplete(autoCompleteRef.current , options) 

        const [map, setMap] = useState();       // 지도 map 

        const [tradableData  , setTradableData] = useState([])      // state 기준으로 뽑은 거래가능한 데이터 | 현재는 테스트 버전만 뽑음

        const [arrMarker, setArrMarker] = useState()        // 찍혀야 하는 마커들

        // const earthquakeDataRef = useRef(null)       // 지진 데이터


        // react-query 로 데이터 가져오기 
            const { data, error, isLoading, isError } = useQuery('fetchData', () =>

            axios.get('http://localhost:8080/detail/tradableEstate', {
                    withCredentials: true,
                })
                .then((res) => res.data)
            );

            // 받아온 거래 가능 데이터에 마커 찍기 
            const setMarker = () => {

                if(!map) return     // [해석] map 이 null 값인 경우, 오류가 나니까 넣음

                console.log( "배열로 들어오나?" , tradableData )
                // const arrLocation = tradableData

                let arrMarker = [];
                
                tradableData.forEach( (item) => {
                    // console.log("item.deposit" , item.deposit)
                    const tempLocation = new window.google.maps.LatLng(item.lat, item.lng)
                    const tradableMarker = new window.google.maps.Marker({
                        position : tempLocation, 
                        map : map, 
                        value : item.deposit    // 이게 클러스터링 계산에 들어감. 유형은 숫자
                    })
                    
                    // 클러스터링 위해 배열에 marker 넣기 
                    arrMarker.push(tradableMarker)
                    // console.log("tempArrMarker" , tempArrMarker)
                    // setArrMarker(tempArrMarker)
                    // console.log("arrMarker" , arrMarker)


                    // 임시. 정규표현식으로 앞자리만 가져오기 | 완전 임시
                    const tempDeposit = String(item.deposit)
                    // console.log(tempDeposit)
                    const match = tempDeposit.match(/^\d+/);
                    // console.log("정규표현식" ,match) // match == 1000
                    // console.log("정규표현식" ,match[0]) 
                    // const number = match ? match[0]: "";
                    
                    const contentString = `<div> ${match[0][0]} 억 </div>`;

                    // marker 가 만들어질 때 마다 info window 생성
                    const infoWindow = new window.google.maps.InfoWindow();

                    infoWindow.setContent(contentString);
                    infoWindow.open({
                        anchor : tradableMarker, 
                        map, 
                        shouldFocus : false
                    })
                    
                })

                try {
                    console.log("Starting clusterer🚀🚀");
                    console.log("map" , map)
                    console.log("typeof(arrMarker)" , typeof(arrMarker))
                    console.log("arrMarker" , arrMarker)
                    console.log("Is arrMarker an array?", Array.isArray(arrMarker));    // true 

                    // 클러스터로 그룹화 하기 | 
                    new window.MarkerClusterer(map, arrMarker,  {
                        
                        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m', 
                        // or your custom path : 커스텀에 필요함 ⭐⭐
                        
                        // 간단한 테스트
                        // calculator: function(markers) {
                        //     console.log("Simple calculator called!📚📚");
                        //     return { text: markers.length.toString(), index: 1 };
                        // }

                        // 지우지마 | 평균값을 구하는 것 임
                        calculate : function(markers, numStyles) {
                            
                            console.log("calculator 동작하니🌴🌴")
                            let totalValue = 0;
        
                            console.log( "markers📌📌📌" , markers)
        
                            markers.forEach( (item) => {
                                console.log("item.value🚀🚀" , item.value)
                                totalValue += item.value
                            } )
                            
                            console.log("markers📌📌📌" , arrMarker)
        
                            let averageValue = totalValue/markers.length;
                            console.log(" averageValue " , averageValue)

                            // 마커의 개수에 따라 index 값을 설정하는 로직을 유지하려면 다음 코드를 사용하세요:
                            let index = 0;
                            let dv = markers.length;
                            while (dv !== 0) {
                                dv = Math.floor(dv / 10);
                                index++;
                            }
                            // index = Math.min(index, numStyles);

                            // 만약 평균 값을 기반으로 index 값을 설정하려면 위의 코드 대신 다음 코드를 사용하세요:
                            index = Math.min(averageValue, numStyles)
        
                            return {
                                text : averageValue + "억👍", 
                                index : Math.min(averageValue, numStyles)
                        }}
                    }  
                    );
                    
                } catch (error) {
                    console.log("✅✅✅✅✅" , error)
                }
            }

            useEffect(() => {
                setMarker();
            }, [tradableData]);
        
        // 가져온 데이터 확인
        useEffect(() => {
            if (error) {
                console.log(error);
                console.dir(error);
            }
            if (!isLoading && !isError && data) {
                console.log("서버에서 받아온 데이터" , data.tradableEstate)
                setTradableData(data.tradableEstate)
                console.log("setTradableData 저장되는 순간" , tradableData)
                // 데이터 사용하는 코드를 여기에 작성하면 됩니다.
                // 예: setYourState(data);
            }
        }, [data, error, isLoading, isError]);

        
        // 초기맵 셋팅
        useEffect( () => {
            const createdMap = new window.google.maps.Map(mapRef.current , {
                center: { lat: 37.521168186048, lng: 126.9791296664 },
                zoom: 13,
                mapTypeControl: false,
            });
            setMap(createdMap);
        } , [])


        // 마커 찍기
        useEffect ( () => {
            setMarker()
        }   )
            // [부족한 것] 그런데, 여기에, 의존성은 없나? 😥


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
                


                // 추천 항목 클릭하면 벌어지는 일
                autocomplete.addListener('place_changed', () => {
                    const marker = new window.google.maps.Marker({
                        map, 
                        anchorPoint : new window.google.maps.Point(0 , -29)
                    })
                    // setCreatedMarker(marker);

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

                    // setMarker()

                });
            }
            // tradableData 은 '서버' 에서 받아오는 것 이기 때문에 -> 다 받아질 때 까지 '기다림' => so, '비동기' 임. 
        }, [map , tradableData])

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

        export default PAC_Map

