import React, { useMemo, useState } from 'react'

import {GoogleMap , useLoadScript , Marker} from "@react-google-maps/api";
import mapContainerStyle from './GoogleMap_3_STYLED'

import usePlacesAutocomplete, {
    getGeocode, 
    getLatLng,
} from "use-places-autocomplete"
    // [전제] npm install use-places-autocomplete 설치 해야 함
    /* 
    [해석]
        usePlacesAutocomplete : 자동 완성 기능 
        getGeocode : 주소, 장소ID, 위도/경도 좌표를 주면 -> 세부 지리 정보를 가져옴
        getLatLng : getGeocode 의 세부 지리 정보를 기반으로 -> 해당 위치의 '위도 경도' 추출
    */

import {
    Combobox,   // 컨테이너 역할. 이 안에, comboboxinput, comboboxpopover 등이 들어감 
    ComboboxInput,      // 실제 입력 필드
    ComboboxPopover,    // 제안 목록이 표시되는 곳
    ComboboxList,       // 실제 제안이 포함된 목록을 레더링 | 📛 ComboboxPopover 와의 차이는?  
    ComboboxOption,     // 제안 목록들 중 하나. ComboboxList 에 포함됨.  
} from "@reach/combobox"
    /* [Combobox 기능] 
        사용자가 입력하면 ->  관련 제안 목록이 나타남 
        use-places-autocomplete 와 함께 사용하면, google place 에서 가져온 제안을 동적으로 표시 가능 ⭐⭐⭐
    */

// import "@reach/combobox/style.css"


export default function GoogleMap_3() {
    const {isLoaded} = useLoadScript({
        // git 에 올릴 때는 지우고 올려야 함
        googleMapsApiKey : "AIzaSyB2Ks0HcfUkSKcjRU39pReueRDIofHxPio",
            // googleMapsApiKey : process.env.REACT_APP_GOOGLE_MAPS_API_KEY,

        // API 추가 기능 가져오기 
        libraries : ["places"]
            // EX) 장소 검색, 자동 완성, 거리 계산, 상세 정보 제공 기능, 가까운 장소 추천 등 
    })
    
    console.log("api 연결되었나 확인" ,isLoaded)

    if(!isLoaded){
        return <div> Loading...🐣 </div>;
    }
    return <Map />
}

const Map = () => {
    const center = useMemo(() => ({ lat : 43.45 , lng : -80.49 }) , [])
        // [해석]
            // 이 값을 기억하고 있다가 -> 변경될 때만, 렌더링 되게 하기. 
            // [ ] 이 값은, 종속성이 없기 때문에, 빈 배열 
            // 값을 한번 계산하고, 리렌더링 될 때 마다, 값을 가져와서 사용. 
        // [효과]
            // 실수로, 중심을 다시 44, -80 으로 바꾸는 문제를 해결
    
    {/* 자동 완성 기능 사용하면 -> 선택한 장소의 위도와 경도를 selected에 저장함 */}
    const [selected , setSelected] = useState(null);
        // [아직 모르겠음 😥]
            // 이 상태가 변경되면 -> 해당 변경 사항이 자식 컴포넌트에 반영
            // 이 코드에서는 selected 상태를 사용하여 Google Map 위에 Marker 컴포넌트를 표시하고 있으므로, 사용자가 장소를 선택하면 해당 위치에 마커가 표시되게 됩니다.


    return ( 
    
        <>
            {/* 선택관련 메소드를 -> 자동완성 컴포넌트에 전달 */}
            <div className='places-container' >
                <PlacesAutocomplete  setSelected = {setSelected} />
                    {/* location 을 전달할 수 있게 됨 -> 해당 위치에 marker 를 찍게 됨 */}
            </div>
            {/* [기능 흐름] 사용자가 선택 -> setSelected 함수 자체를 props 로 전달 PlacesAutocomplete 안에서 변경 

            */}

            {/* 구글맵 초기 셋팅 및 마커 위치 설정  */}
            <GoogleMap                 
                // GoogleMap 컴포넌트에 3가지 props 필요⭐
                mapContainerClassName="map-container"    
                zoom={10} 
                center={center} 
            >

            {selected && <Marker position={selected} />}
                {/* [기능 흐름] 
                        - selected 가 비어있지 않으면 -> 선택한 곳의 위도 경도가 Marker 에 props 로 전달 | Marker 컴포넌트는 그걸 필요로 하는 놈임
                    [분석]
                        - 여기에서, selected 는, '선택된 주소 -> 위도, 경도 변환 -> selected 변수에 담기' 과정을 거친 것
                        - 이러한 위도, 경도 정보를 Marker 에 전달하니까, 핀이 꽂힐 수 있음. 
                
                */}
            </GoogleMap>
        </>
    )
}

// 주소 자동 완성 기능 컴포넌트
const PlacesAutocomplete = ({setSelected}) => {

    const {
        ready,  // 주소 자동 완성 기능이 '가능한 상태인가'  
        value,  // 사용자가 입력한 주소값을 저장. 사용자가 입력한 부분. 
        setValue,   // 사용자가 입력한 값을 'value' 에 설정
        suggestions : {status, data},   // 사용자가 입력한 값과 일치하는 주소 제안 
            // status : 제안의 상태. OK 면 제안 사용이 가능한 것. 결과를 제대로 가져왔는가 
            // data : 제안된 주소 목록
        clearSuggestions,       // 제안 목록을 지우는 함수
    } = usePlacesAutocomplete();

    // 사용자가 선택한 주소를 -> 위도 경도로 변환 -> so, 비동기 함수가 된다. 
    const handleSelect = async (address) => {
        
        // 사용자가 선택한 '주소' 문자열 자체를 -> value 에 저장
        setValue(address , false);  // false 로 해서, 추가 데이터는 안 넣는 걸로

        // 제안된 목록 지우기
        clearSuggestions();

        // 문자열 주소를 -> 위도 경도로 변환
        const results = await getGeocode({address})     // 선택한 주소의 지리 정보 가져오기
        const {lat , lng} = await getLatLng(results[0])     // 결과물에서 위도, 경도 추출

        // props 로 들어온 setSelected 에 변환된 위도, 경도를 전달 -> 여기가 선택됨을 알려줌 -> selected 에 변환된 위도 경도 값이 담김 
        setSelected({lat , lng})
    }

    // return <Combobox onSelect = {handleSelect} >
    //         {/* combobox 안에 input 까지 넣어야 화면에 보임 */}
    //         <ComboboxInput 
    //             value = {value}
    //             onChange = { (e)=> setValue(e.target.value) }
    //             disabled = {!ready}     // 바로 타이핑 시작할 수 있음. 
    //             className = "combobox-input"
    //             placeholder = "Search an address"
    //         />

    //         {/* 검색된 것의 '결과' 보여주기 */}
    //         <ComboboxPopover>
    //             {/* 추천 '결과' 가 나옴 */}
    //             <ComboboxList>
    //                 {/* status 가 괜찮을 때 -> 실제로 data 를 추천 받음 */}
    //                 {status === "OK" && 
    //                     data.map( ( {place_id , description} ) => {
    //                         <ComboboxOption  key={place_id} value={description} />
    //                     } )
    //                 }
    //             </ComboboxList>
    //         </ComboboxPopover>
    //     </Combobox>

}
