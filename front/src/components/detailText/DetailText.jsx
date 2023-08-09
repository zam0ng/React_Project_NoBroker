import React from 'react'
import { DetailTitle, DetailUl, DetailContent } from './detailText.styled'

const DetailText = ({estate, seller}) => {
    console.log(estate)
    console.log(seller)
    console.log(estate.additional_address);

  return (
    <div>
      <h3>상세 정보</h3>
      <DetailUl>
        <li>
        <DetailTitle>매매가</DetailTitle>
        <DetailContent>{estate.balance + estate.deposit}</DetailContent>
        </li>
        <li>
        <DetailTitle>주소</DetailTitle>
        <DetailContent>{estate.road} <br /> {estate.additional_address}</DetailContent>
        </li>
        <li>
        <DetailTitle>건축년도</DetailTitle>
        <DetailContent>{estate.year_built}</DetailContent>
        </li>
        <li>
        <DetailTitle>전용 면적</DetailTitle>
        <DetailContent>{estate.area}㎡</DetailContent>
        </li>
        <li>
        <DetailTitle>타입</DetailTitle>
        <DetailContent>{estate.type}</DetailContent>
        </li>
      </DetailUl>

    </div>
  )
}

export default DetailText