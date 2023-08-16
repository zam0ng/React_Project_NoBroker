    import React, { useState, useEffect , useRef, useCallback} from 'react'
    import axios from 'axios';
    import { useQuery } from 'react-query';
    import { MarkerClusterer } from "@googlemaps/markerclusterer";

    import PAC_Map_Wrapper from 'components/PlaceAutoCompleteSearch/styles';
    import SubHeader from 'components/SubHeader';
    import MainContentWrap from 'components/MainContentWrap/styles';
    import ContentWrapper from 'components/ContentWrapper/styles';
    import ItemList from 'components/ItemList';

    import CreateZoomControl from 'components/CreateZoomControl/index'

    import FilterButton from 'components/FilterButton/index'

    import { 
        FilterContainer, 
        SearchContainer,
        SubHeaderWrapper,
        SearchBarContainer,
    } from 'components/PAC_Map/styles';

    import FilterCheckBoxModal from 'components/FilterCheckBoxModal/index';
    import FilterRangeModal from 'components/FilterRangeModal/index';
    import FilterModalContainer from 'components/FilterCheckBoxModal/styles'


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

    const [arrMarker, setArrMarker] = useState([])        // 찍혀야 하는 마커들


    // modal 상태 관리 
    const [isDateModalOpen, setIsDateModalOpen] = useState(false)
    const [isPriceModalOpen, setIsPriceModalOpen] = useState(false)
    const [isRoomTypeModalOpen, setIsRoomTypeModalOpen] = useState(false)
    const [isAreaModalOpen , setIsAreaModalOpen] = useState(false)


    // 데이터 필터링 상태관리
    // const [isRoomType , setIsRoomType] = useState('전체')
    const [checkboxValue , setCheckboxValue] = useState(null) // 이때, 초기값 잘 설정해야 함 ✅✅✅✅✅


    // 데이터 필터링 handler
    const handleCheckBox = (inputValue) => {
        setCheckboxValue(inputValue);
        console.log("checkboxValue에 저장" , checkboxValue) // 🔵 작동함
    }

    const handleRoomType = useCallback ( () => {

    } )

    // model handler
    const handleDateModal = useCallback(() => {
        setIsDateModalOpen(prevState => !prevState);
        } , [isDateModalOpen])  
        
    const handlePriceModal = useCallback(() => {
        setIsPriceModalOpen(prevState => !prevState);
        } , [isPriceModalOpen])  
        
    const handleRoomTypeModal = useCallback(() => {
        setIsRoomTypeModalOpen(prevState => !prevState)
        } , [isRoomTypeModalOpen])  
        
    const handleAreaModal = useCallback(() => {
        setIsAreaModalOpen(prevState => !prevState)
        } , [isAreaModalOpen])  


    // + - 버튼 나오게 하기 😥😥😥 
    const createZoomControl = ( map ) => {
        const handleZoomIn = () => {
            const currentZoom = map.getZoom();
            map.setZoom(currentZoom + 1);
        };
    
        const handleZoomOut = () => {
            const currentZoom = map.getZoom();
            map.setZoom(currentZoom - 1);
        };
    
        // DOM 엘리먼트 생성
        const controlDiv = document.createElement("div");
        controlDiv.style.padding = "10px";
    
        const zoomInButton = document.createElement("button");
        zoomInButton.innerHTML = "+";
        zoomInButton.style.width = "40px";
        zoomInButton.style.height = "40px";
        zoomInButton.addEventListener("click", handleZoomIn);
        controlDiv.appendChild(zoomInButton);
    
        const zoomOutButton = document.createElement("button");
        zoomOutButton.innerHTML = "-";
        zoomOutButton.style.width = "40px";
        zoomOutButton.style.height = "40px";
        zoomOutButton.addEventListener("click", handleZoomOut);
        controlDiv.appendChild(zoomOutButton);
    
        return controlDiv;
    }
    
    useEffect( () => {
        if(map) {
            const zoomControl = createZoomControl(map);
            map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(zoomControl);
        }
    }, [map]);

    // 마커 초기화 | 📛📛📛📛📛📛📛📛📛📛 아직 미완료 
    const cleanMarkers = () => {
        //  // 모든 마커를 지도에서 제거합니다.
        // for (let i = 0; i < arrMarker.length; i++) {
        //     arrMarker[i].setMap(null);
        // }
        // arrMarker.length = 0; // 마커 배열을 비웁니다.
    }

    // 마커 그리기
    useEffect(() => {
        setMarker();
            // useEffect 안에서 cleanup function을 사용하여 마커를 초기화        
        console.log("@PAC_MAP | 현재 tradableData" , tradableData)
        }, [tradableData]);

        // // 거래가능 데이터에 필터버튼 반영해서, 솎아주기
        // const tradableDataFilter = (tradableData) => {

        //     console.log("tradableData🚀🚀🚀" , tradableData)
        
        //     // return filteredData
        // }

    // [react-query 로 데이터 가져오기] 
        // [거래가능한 매물 받아오기] 
        // ✅✅PAC_MAP 에서 한 거랑 합치기
            // api 가져오는 함수 정의만 함. 아직 쓴건 아님. 
                const fetchFilterTradableEstateData = async () => {
                    const response = await axios.get(`http://localhost:8080/list/tradableEstate?roomType=${checkboxValue}` , {
                        withCredentials : true, 
                    })
                    // setTradableData(data.tradableEstate) // 이건 setTradabledata 를 useeffect 로 저장할 때의 버전
                    console.log("fetchFilterTradableEstateData 받아오는 것 확인" , response.data.tradableEstate)

                    setTradableData(response.data.tradableEstate)

                    return response.data.tradableEstate
                }

                const { data , error , isLoading } = useQuery( ['filterTradableEstateData' , checkboxValue] , fetchFilterTradableEstateData , {
                    // enabled : !!checkboxValue //  [해석] 이게 활성화 되면 -> checkboxValue 에 값이 있을 때만 값이 가져와짐
                })

                // 예전 버전
                    // const { data, error, isLoading, isError } = useQuery('fetchData', () =>

                    // axios.get('http://localhost:8080/list/tradableEstate', {
                    //         withCredentials: true,
                    //     })
                    //     .then((res) => res.data)
                    // );

                // PAC_MAP 에서 가져온거 | 원본 ⭐⭐
                // const fetchFilterTradableEstateData = async () => {

                    //   const response = await axios.get(`http://localhost:8080/list/tradableEstate?roomType=${checkboxValue}` , {
                    //     withCredentials : true, 
                    //   })
                    //   console.log("response 들어왔나🐣🐣🐣" , response)   // 📛 back 에서 아직 데이터가 안 들어옴
                    //   return response.data.tradableEstate
                    // }

                    // const { data , error , isLoading } = useQuery( ['filterTradableEstateData' , checkboxValue] , fetchFilterTradableEstateData , {
                    //     enabled : !!checkboxValue
                    // })


                // 이렇게 query 키를 갖고 있을 때, 
                // const { data , error , isLoading } = useQuery( ['filterTradableEstateData' , checkboxValue] , fetchFilterTradableEstateData , {
                //     enabled : !!checkboxValue
                //   } )


                // // 가져온 데이터 확인
                    // useEffect(() => {
                    //     if (error) {
                    //         console.log(error);
                    //         console.dir(error);
                    //     }
                    //     if (!isLoading && !isError && data) {
                    //         console.log("@PAC_MAP | 가장 먼저 실행 | 서버에서 받아온 데이터" , data.tradableEstate)
                            
                    //         setTradableData(data.tradableEstate)
                            
                    //         // 근데 저장이 안 되는데? 
                    //         console.log("setTradableData 저장되는 순간 @ PAC_MAP👍👍👍" , tradableData)
                            
                    //     }
                    // }, [data, error, isLoading, isError]);


                    // 자식과 동일한 unique key 테스트
                        // const { data, error, isLoading, isError } = useQuery(
                        //     ['filterTradableEstateData' , checkboxValue],
                        //     () => 
                        //         axios.get('http://localhost:8080/list/tradableEstate', {withCredentials: true})
                        //         .then((res) => res.data),
                        //     {enabled : !!checkboxValue}
                        //     );

                    // 예전 버전 
                        // const { data, error, isLoading, isError } = useQuery('fetchData', () =>

                        // axios.get('http://localhost:8080/list/tradableEstate', {
                        //         withCredentials: true,
                        //     })
                        //     .then((res) => res.data)
                        // );

    


    // 받아온 거래 가능 데이터에 마커 찍기 
    const setMarker = () => {
        // 배열통에 넣고, map 에 그리기 
        let arrMarker = [];

        // 마커 초기화
            // cleanMarkers();

            // 우선 써보기 
            for (let i = 0; i < arrMarker.length; i++) {
                arrMarker[i].setMap(null);
            }

        if(!map) return     // [해석] map 이 null 값인 경우, 오류가 나니까 넣음

        
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

            // 임시. 정규표현식으로 앞자리만 가져오기 | 완전 임시
            const tempDeposit = String(item.deposit)
            // console.log(tempDeposit)
            const match = tempDeposit.match(/^\d+/);
                // console.log("정규표현식" ,match) // match == 1000 // console.log("정규표현식" ,match[0])  // const number = match ? match[0]: "";
            
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
            // console.log("Starting clusterer🚀🚀");  // console.log("map" , map)  // console.log("typeof(arrMarker)" , typeof(arrMarker))

            // 클러스터로 그룹화 하기 | 
            new window.MarkerClusterer(map, arrMarker,  {
                
                imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m', 
                // or your custom path : 커스텀에 필요함 ⭐⭐
                
                // 간단한 테스트
                // calculator: function(markers) {
                //     console.log("Simple calculator called!📚📚");
                //     return { text: markers.length.toString(), index: 1 };
                // }

                // 지우지마 | 평균값을 구하는 것 임 | 아직 작동 안 함 😥😥 
                // calculate : function(markers, numStyles) {
                    
                //     console.log("calculator 동작하니🌴🌴")
                //     let totalValue = 0;

                //     console.log( "markers📌📌📌" , markers)

                //     markers.forEach( (item) => {
                //         console.log("item.value🚀🚀" , item.value)
                //         totalValue += item.value
                //     } )
                    
                //     console.log("markers📌📌📌" , arrMarker)

                //     let averageValue = totalValue/markers.length;
                //     console.log(" averageValue " , averageValue)

                //     // 마커의 개수에 따라 index 값을 설정하는 로직을 유지하려면 다음 코드를 사용하세요:
                //     let index = 0;
                //     let dv = markers.length;
                //     while (dv !== 0) {
                //         dv = Math.floor(dv / 10);
                //         index++;
                //     }
                //     // index = Math.min(index, numStyles);

                //     // 만약 평균 값을 기반으로 index 값을 설정하려면 위의 코드 대신 다음 코드를 사용하세요:
                //     index = Math.min(averageValue, numStyles)

                //     return {
                //         text : averageValue + "억👍", 
                //         index : Math.min(averageValue, numStyles)
                // }}
            });
            
        } catch (error) {
            console.log("✅✅✅✅✅" , error)
        }
    }



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
        console.log( "@PAC_MAP checkboxValue" , checkboxValue )
    }  , [checkboxValue] )

    useEffect( () => {
        console.log()
    } )


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
                            // input 은 인풋 창에서 입력한 값, options 는 추천되는 값들
                        // Autocomplete 의 매개변수로 2개가 들어오는데, 리액트에서는, useRef 훅을 사용함 
                        // 따라서, input 매개변수는 autoCompleteRef.current 로써 전달되고 있음.
                        // 추천된 결과물은 autocomplete 에 담김 
            );            
                // [추가 기능] api 반환 필드를 추가해줄 때
                    // autocomplete.setFields(['address_components', 'geometry', 'icon', 'name']);
            
            // 지도의 bounds 속성을 자동완성 객체에 바인딩
            autocomplete.bindTo("bounds", map);
                    // [기능] 
                        // autocomplete 의 'bounds' 속성을, map 객체의 'bounds' 속성에 '바인딩' 
                        // 그러면, '지도 영역 내 or 기반으로 추천' 해줌
                    // [문법] createdMap 변수가 setMap(createdMap) 훅에 의해 -> map 에 담김

            // 추천 항목 클릭하면 'place_changed' 실행
            autocomplete.addListener('place_changed', () => {
                const marker = new window.google.maps.Marker({
                    map, 
                    anchorPoint : new window.google.maps.Point(0 , -29)
                })
                // setCreatedMarker(marker);

            // autocomplete 객체에서 ⭐'사용자가 선택한 장소'⭐ 데이터 가져오기
            const place = autocomplete.getPlace();

                // place 에 어떤 데이터가 들어오는지 확인하기
                console.log('place 값의 유형' , place) 
                
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
                <SubHeaderWrapper>
                    <SearchContainer>
                        <SearchBarContainer>
                                <input  className='searchBarTest' id="autocomplete" ref={autoCompleteRef} placeholder="Enter your address" type="text" style={{width : "100%"}} /> 
                        </SearchBarContainer>
                    </SearchContainer>

                    <FilterContainer>

                        {/* Roomtype 필터 | 아파트 vs 오피스텔 */}
                            <FilterButton title={"아파트, 오피스텔, 주택"} handleModal = {handleRoomTypeModal }  />                             
                            {
                                isRoomTypeModalOpen ? <FilterCheckBoxModal checkboxValue={checkboxValue} setCheckboxValue={setCheckboxValue} handleCheckBox={handleCheckBox} tradableData={tradableData} setTradableData = {setTradableData}  title={"checkbox 모달 | 아파트 vs 오피스텔"} left = {"0px" } /> : null
                            }

                        {/* 매매 가격 필터 | 아파트 vs 오피스텔 */}
                            <FilterButton title={"거래 가격"} handleModal = {handlePriceModal }  />                             
                            {
                                isPriceModalOpen ? <FilterRangeModal  title={"range 모달 | 가격 "} left = {"85px" } /> : null
                            }
                        
                        {/* 사용 승인일 | 신축, 준신축, 구축 */}
                            <FilterButton title={"사용 승인일"} handleModal = {handleDateModal }  />                             
                            {
                                isDateModalOpen ? <FilterCheckBoxModal title={"checkbox 모달 | 신축 여부"} left = {"155px" } /> : null
                            }
                        
                        {/* 면적  필터 | 아파트 vs 오피스텔 */}
                            <FilterButton title={"면적"} handleModal = {handleAreaModal }  />                             
                            {
                                isAreaModalOpen ? <FilterRangeModal  title={"range 모달 | 집 넓이 "} left = {"235px" } /> : null
                            }
                        
                    </FilterContainer>
                </SubHeaderWrapper>


                <MainContentWrap>
                    <ContentWrapper>
                        <ItemList className="ItemList" /> 
                        <ItemList className="ItemList" /> 
                        <ItemList className="ItemList" /> 
                        <ItemList className="ItemList" /> 
                        <ItemList className="ItemList" /> 
                        <ItemList className="ItemList" /> 
                        <ItemList className="ItemList" /> 
                        <ItemList className="ItemList" /> 
                        <ItemList className="ItemList" /> 
                        <ItemList className="ItemList" /> 
                        <ItemList className="ItemList" /> 
                        <ItemList className="ItemList" /> 
                        <ItemList className="ItemList" /> 
                    </ContentWrapper> 

                    <PAC_Map_Wrapper>
                        
                        <div id='map' ref={mapRef} style={{ height: '100vh', width: '100%' }}  />
                        <CreateZoomControl map={map} />

                    </PAC_Map_Wrapper>
                </MainContentWrap>

        </>
    )    
    }

        export default PAC_Map