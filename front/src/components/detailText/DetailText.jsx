import React from 'react'
import { DetailTitle, DetailUl, DetailContent, H1 } from './detailText.styled'

const DetailText = ({estate, seller}) => {

    // 돈 단위 설정
    const won = (money) => {

      if (money >= 10000 && money < 100000000) {
          const man = Math.floor(money / 10000);
          return `${man}`;
      } else if (money >= 100000000) {
          const eok = Math.floor(money / 100000000);
          const remainder = money % 100000000;
          return `${eok}억${remainder >= 10000 ? ` ${won(remainder)}` : ''}`;
      } else if (money < 10000){
          return `${money}원`;
      } else {
        return money;
      }
  }


  return (
    <div>
      <DetailUl>
      <H1>상세정보</H1>
        <li>
        <DetailTitle>매매가</DetailTitle>
        <DetailContent>{won(estate.deposit)}</DetailContent>
        </li>
        <li>
        <DetailTitle>계약금</DetailTitle>
        <DetailContent>{won(estate.balance)}</DetailContent>
        </li>
        <li>
        <DetailTitle>주소</DetailTitle>
        <DetailContent>{estate.road} {estate.additional_address}</DetailContent>
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
        <li>
        <DetailTitle>매물 등록일</DetailTitle>
        <DetailContent>{estate.createdAt.substr(0,10)}</DetailContent>
        </li>
      </DetailUl>
    </div>
  )
}

export default DetailText