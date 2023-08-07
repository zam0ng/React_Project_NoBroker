import React from 'react'
import { DetailTitle } from './detailText.styled'

const DetailText = ({estate, seller}) => {
    console.log(estate)
    console.log(seller)
    console.log(estate.additional_address);

  return (
    <div>
        <div>
        <DetailTitle>매매가</DetailTitle>
        <DetailTitle>{estate.balance + estate.deposit}</DetailTitle>
        </div>
        <div>
        <DetailTitle>주소</DetailTitle>
        <DetailTitle>{estate.additional_address}</DetailTitle>
        </div>
        <div>
        <DetailTitle>건축년도</DetailTitle>
        <DetailTitle>{estate.year_built}</DetailTitle>
        </div>
        <div>
        <DetailTitle>전용 면적</DetailTitle>
        <DetailTitle>{estate.area}㎡</DetailTitle>
        </div>
        <div>
        <DetailTitle>타입</DetailTitle>
        <DetailTitle>{estate.type}</DetailTitle>
        </div>

    </div>
  )
}

export default DetailText