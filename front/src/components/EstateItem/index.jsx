import React from 'react'
import { 
  CardItemWrapper, 
  CardItem,
  ImgWrap,
  InfoWrap,
  ImgThumbnail,
  LikeBtnWrap,
  HeaderPrice,
  RoomType,
  RoomDesc,
  SellerType,
} from 'components/EstateItem/styles'



import { heartButton } from 'img'

const EstateItem = () => {
  return (

    <CardItemWrapper>
      <CardItem>

        <ImgWrap>

          <ImgThumbnail>
            <img src={"https://d1774jszgerdmk.cloudfront.net/512/e4356ef7-5d88-4976-b422-fef2393c2551-2"} /> 
          </ImgThumbnail>

          <LikeBtnWrap>
            <img src={heartButton} alt="" /> 
          </LikeBtnWrap>

        </ImgWrap>


        <InfoWrap>

          {/* deposit , 거래 유형 데이터를 가져와야함*/}
          <HeaderPrice>  
            매매 1억 7000
          </HeaderPrice>  
          
          {/* real_estate 에서 > type 가져와서 넣어주면 됨 ex) 아파트, 주택, 등  */}
          <RoomType>
            아파트
          </RoomType>

            {/* 특징 : 1) 신축 여부 (신축 0~5년, 준신축 5년~10년, ) 2) 면적 */}
            {/* m2 이거 변환해야 함 */}
          <RoomDesc>
            신축(5년이내) , 28.93m2, 
          </RoomDesc>

          {/* 특징 : 1) 지하철 3분 거리 2) 공원근처 | 구글 맵에서 계산해서 보여주면 좋을거 같음 ✅ */}
          <RoomDesc>
            천호역 도보 5분, 천호공원 및 한강 공원 도보 10분
          </RoomDesc>
            {/* 추가 가능 한 것 : 남은 거래 기간 / 댓글 개수 / SNS스럽게 업데이트 해봐도 좋을 듯! */}

          {/* 누가 내놨는지 보여주기 : 1) 일반유저(다방은 방주인이라고 함), 2) 중개인 */}
          <SellerType>
            <span> 중개인 </span>
            <span> 방주인 </span>
          </SellerType>

        </InfoWrap>

      </CardItem>
    </CardItemWrapper>

  )
}

export default EstateItem