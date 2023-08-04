import React from 'react'
import {MainTitle,Caution,Bodyy,EstataInfoTitle} from './insertstyled';
import Postcode from './postPopup/Post'
import TypeSelect from './estateTypeSelect/TypeSelect'
const Insert = () => {
  return (
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
        <span>* 필수 입력</span>
      </EstataInfoTitle>

      <TypeSelect></TypeSelect>
      {/* <Postcode></Postcode> */}
    </Bodyy>
  )
}

export default Insert