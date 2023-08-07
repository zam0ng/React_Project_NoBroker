import React, { useEffect } from 'react'
import {MainTitle,Caution,Bodyy,EstataInfoTitle,WarningSpan,EssentialSpan,Modalbody,Modal} from './insertstyled';
import Postcode from './postPopup/Post'
import TypeSelect from './estateTypeSelect/TypeSelect'
import Area from './estateArea/Area';
import EstateDoc from './estatedoc/EstateDoc'
import EstateBuilt from './estate_year_built/EstateBuilt'
import Deposite from './deposite/Deposite'
import ImgMulter from './imgMulter/ImgMulter';
import { useState } from 'react';
const Insert = () => {

  const [balance,setBalance] = useState(0);
  const [deposite,setDeposite] = useState(0);
  const [display,setDisplay] = useState("none");
  console.log(balance);
  console.log(deposite);

  function None() {
    setDisplay("none");
    document.body.style.overflow="visible";

  }
  function Block() {
    setDisplay("block");
    document.body.style.overflow="hidden";
  }
  // useEffect(()=>{
    
  // },[balance])
  return (
    <>
    <Bodyy>
      <MainTitle>방내놓기</MainTitle>
      <Caution>
      <ul> 
        <li>주소를 다르게 입력할 경우 허위매물로 신고될 수 있으니 꼭 동일하게 입력 바랍니다.</li>
        <li>매물을 등록하면 투표가 진행되고 총 투표율이 70% 미만시 투표 미달로 분류되며 재등록이 가능합니다.</li>
        <li>총 투표율이 70% 이상시 과반수에 따라 정상, 허위 매물로 분류되며 허위매물로 분류시에 경고 1회 누적됩니다.</li>
      </ul>
      </Caution>
      <EstataInfoTitle>
        <div>매물 정보</div>
        <EssentialSpan>* 필수 입력</EssentialSpan>
      </EstataInfoTitle>

      <TypeSelect></TypeSelect>
      <Postcode></Postcode>
      <Area></Area>
      <EstateDoc></EstateDoc>
      <EstateBuilt></EstateBuilt>
      
      <EstataInfoTitle>
        <div>거래 정보</div>
      </EstataInfoTitle>
      <Deposite setBalance={setBalance} setDeposite={setDeposite} deposite = {deposite}></Deposite>
      <EstataInfoTitle>
        <div>사진 등록</div>
        <WarningSpan onClick={Block}>* 사진 등록 전, 반드시 확인해주세요!</WarningSpan>
      </EstataInfoTitle>
      <ImgMulter></ImgMulter>
    </Bodyy>

    <Modalbody display ={display}>
      <Modal>
        <h4>사진 등록전, 반드시 확인해주세요!</h4>
        <hr></hr>
        <h5>일반 사진</h5>
      <div>
        <p>1. 사진은 최대 7장까지 등록할 수 있습니다.</p>
        <p>2. 가로로 찍은 사진을 권장하며,</p> 
        <p>3. 사진 용량에 따라 시간이 지연될 수 있습니다.</p>
        <p>3. 해당 매물과 관련된 실 사진만 첨부 바랍니다.</p>
      </div>
      <button onClick={None}>닫기</button>
      </Modal>
    </Modalbody>
    </>
  )
}

export default Insert