import React, { useEffect, useState } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import {Container,Title,AddressContainer,MapContainer,AddressSearchBtn,AddressList
        ,Namee,Address,AddressBox,AdditionalBox,AdditionalInput} from './poststyled'
import MapApi from '../map/MapApi';

const Postcode = () => {
  const [road,setRoad] = useState();
  const [jibun,setJibun] = useState();
  const [placeAddress,setPlaceAddress] = useState();
  const [isNone,setIsNone]= useState("block");
  const scriptUrl = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

  const open = useDaumPostcodePopup(scriptUrl);

  const handleComplete = (data) => {
    console.log(data); // 
    console.log(data.address)//

    const ta = data.address;
    setPlaceAddress(ta);

    const roadAddress = data.roadAddress;
    const jibunAddress = data.jibunAddress;
    setRoad(roadAddress);
    setJibun(jibunAddress);
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    // console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    
  };

  const handleClick = () => {
    open({ onComplete: handleComplete});
  };

  return (
    <Container>
      <Title>매물 주소<span>*</span></Title>
      <AddressContainer>
        <AddressSearchBtn type='button' onClick={handleClick}>주소찾기</AddressSearchBtn>
        <AddressList>

            <AddressBox><Namee><h4>도로명</h4></Namee><Address>{road}</Address></AddressBox>
            <AddressBox><Namee><h4>지번</h4></Namee><Address>{jibun}</Address></AddressBox>
        </AddressList>
            <AdditionalBox>
              <p>상세주소 입력</p>
              <AdditionalInput width={"90%"}></AdditionalInput>
            </AdditionalBox>
      </AddressContainer>
      <MapContainer> 
        <p style={{display:isNone}}>주소를 검색하시면 <br></br> 해당 위치가 지도에 표시됩니다.</p>
        <MapApi placeAddress={placeAddress} setIsNone={setIsNone}></MapApi>
      </MapContainer>    
    </Container>

  );
};

export default Postcode