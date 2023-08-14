import React from 'react'
import { DetailTitle, DetailUl, DetailContent, H1 } from './detailText.styled'

const DetailText = ({estate, seller}) => {

  return (
    <div>
      <DetailUl>
        <H1>상세정보</H1>
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