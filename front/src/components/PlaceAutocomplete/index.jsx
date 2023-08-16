import React, { useState } from 'react'

// font Awesome 아이콘 사용
import {FaSearch} from 'react-icons/fa'

// styled component 
import {InputWrapper} from 'components/PlaceAutocomplete/styles'

// component
import ComboboxInput from 'components/ComboboxInput/index'
import ComboboxOption from 'components/ComboboxOption/index'
import ComboboxList from 'components/ComboboxList/index'


// 지도 그리기, 마커 찍기, 
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

// 장소 자동완성 import
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";




// 자동완성 
const PlaceAutocomplete = ({setSelected}) => {

    // hook 가져오기
    const {
        ready, 
        value, 
        setValue, 
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete();

    // options 중 선택되고 난 다음 실행되는 handler
    const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();
        
        const results = await getGeocode({ address });
        const { lat, lng } = await getLatLng(results[0]);
        setSelected({ lat, lng });
    };
        // [주요기능] api 에 의해 자동으로 매개변수가 들어가고 -> 주소값이 위도 경도로 변환 

    return (
        <>
            <ComboboxInput 
                value = {value}
                onChange = {(e)=>setValue(e.target.value)}
                placeholder="Search an address"        
            />

            <ComboboxList>
                {status === "OK" &&
                    data.map( ( {place_id, description} ) => (
                        <ComboboxOption onClick = {handleSelect} key={place_id} value={description} />
                    ))} 
            </ComboboxList>
        
        </>
    )



}


export default PlaceAutocomplete



