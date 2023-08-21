import React , {useEffect, useState} from 'react'

import ItemListWrapper from './styles'
import EstateItem from 'components/EstateItem/index'

import axios from 'axios';
import { useQuery } from 'react-query';

const ItemList = ({isLoggedIn , item, index , queryClient}) => {
  
// console.log("item 정보" , item)


  // [새로운 접근]
      // 1) tradable data 에 데이터가 어떻게 들어가 있는지 안다 
      // 2) 어떤 값들에 접근할 수 있는지를 보고 -> 저 속성값들을 채워준다.

  return (

    // 여기에서 필요한 데이터는 이제 props 로 전달받아서 사용하면 됨 ⭐⭐⭐⭐⭐⭐ 
    <ItemListWrapper>

    
      <EstateItem
        queryClient = {queryClient}
        item = {item}
        index = {index}  
        estatePrice = {item.deposit}  // 매매가
        estateLike = {item.Likes}   // 좋아요 버튼 클릭 된 기록이 있나? 만약, 있으면 빈 하트 표시 해주기 위해
        estateRoomType = {item.type}  // 아파트 vs 주택
        estateArea = {item.area}
        // estateImg = {item.img_1}  
        // estate설명포인트 = {item.state}   // 이걸 계산해서 찾거나 해야 함 
        // 판매자 유형 데이터 가져와서 방주인 vs 중개업자 선택
        
      />
    
    </ItemListWrapper>

    )
}

export default ItemList

/* 콘솔로 찍히는 item 데이터 예시 
item 정보 
{
    "id": 2,
    "seller": 1,
    "accpet": 1,
    "state": 0,
    "vote_end_date": "2023-08-14T05:57:36.000Z",
    "views": 0,
    "province": "서울시",
    "city": "중구",
    "town": "회현동",
    "jibun": "서울특별시 중구 회현동2가 88",
    "road": "서울특별시 중구 퇴계로 100 (회현동2가)",
    "additional_address": "2동 202호",
    "deposit": 200,
    "balance": 2000,
    "year_built": 2011,
    "lat": 37.5603,
    "lng": 126.983,
    "area": 80.2,
    "doc": "111-1111-1111",
    "type": "주택",
    "img_1": null,
    "img_2": null,
    "img_3": null,
    "img_4": null,
    "img_5": null,
    "img_6": null,
    "img_7": null,
    "createdAt": "2023-08-07T06:54:36.000Z",
    "updatedAt": "2023-08-07T06:54:36.000Z"
}
*/

/* likes 도 같이 받아올 때, 예상되는 데이터 형태 
{
  "tradableEstate": [
    {
      // 매물 1의 정보
      "id": 1,
      "state": 0,
      "type": "원룸",
      "deposit": 10000,
      "year_built": 2022,
      "area": 26,
      // ...
      "Likes": [
        {
          "user_id": 1,
          "real_estate_id": 1
        }
      ]
    },
    {
      // 매물 2의 정보
      "id": 2,
      "state": 0,
      "type": "투룸",
      "deposit": 20000,
      "year_built": 2021,
      "area": 35,
      // ...
      "Likes": null
    },
    // ... 기타 매물들
  ]
}




*/