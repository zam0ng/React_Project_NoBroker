  import React, { useState } from 'react'
  import axios from '../../Axios'

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


  import { detail_heart, detail_emptyheart, userimg } from 'img/index'
  import { heartButton } from 'img'
  import { useEffect } from 'react'
  // import { useMutation } from 'react-query'
  import { error } from 'jquery'
  import { useMutation, useQueryClient } from 'react-query';
  import { useNavigate } from 'react-router-dom'

  import { useAuth } from '../../AuthContext';

  import { serverUrl } from 'components/serverURL'

  const EstateItem = ({
                    // 로그인체크useState,
                    // isLoggedIn,
                    estatePrice,
                    estateLike,
                    estateRoomType,
                    estateArea,
                    item,
                    index,
                    closeStation_1 ,
                    closeStation_2 ,
                    arrCloseStation,
                    // queryClient
                    // estateImg  ,
                    // estate설명포인트
                  }) => {

    const [isLikeBtnClicked , setIsLikeBtnClicked] = useState();

    const [estateID , setEstateID] = useState();
    const queryClient = useQueryClient(); // ✅✅ 이렇게 수정

    const navigate = useNavigate();

    const { isLoggedIn, isCertificate } = useAuth();

    const [estateImgUrl , setEstateImgUrl] = useState()
    const [estateYear , setEstateYear] = useState()

    const [nearSubway_1, setNearSubway_1] = useState()
    const [nearSubway_2, setNearSubway_2] = useState()


    // 좋아요 버튼 추가
    const addLikeBtnMutation = useMutation( async(likeForm) => {
      // filterTradableEstateData
      const {data} = await axios.post("detail/like" , likeForm, {
        withCredentials : true
      })
      return data;
    } , {
      onSuccess : (data) => {
        if(data.message && data.message == "성공") {
          console.log("찜 추가 성공🐣🐣🐣🐣")
          queryClient.invalidateQueries('filterTradableEstateData');  // filterTradableEstateData 키를 가진 usequery 를 재시작 해서, 새로고침없이 1) 데이터 받고 2) 그에 따라 하트 색깔 채우기
        } else {
          console.log("찜 추가 과정에서 오류 발생📛 " , data);
          alert("찜 추가 오류 발생")
        }
      }
    } , {
      onError : (error) => {
        console.error(error)
      }
    })

    // 좋아요 버튼 제거
    const delLikeBtnMutation = useMutation( async(deLikeForm) => {
      // filterTradableEstateData
      const {data} = await axios.post("detail/delLike" , deLikeForm, {
        withCredentials : true
      })
      return data;
    } , {
      onSuccess : (data) => {
        if(data.message && data.message == "성공") {
          console.log("찜 삭제 성공🐣🐣🐣🐣")

          queryClient.invalidateQueries('filterTradableEstateData');  // ⭐⭐ filterTradableEstateData 키를 가진 usequery 를 재시작 해서, 새로고침없이 1) 데이터 받고 2) 그에 따라 하트 색깔 채우기
          queryClient.refetchQueries('filterTradableEstateData')    // ⭐⭐ 무효화된 쿼리를 다시 실행해서, UI 즉시 업데이트 | 그리고 맨 위에 이렇게 import 해줘야 함, 나의 경우 props 전달로는 안 됨 | const queryClient = useQueryClient(); // ✅✅ 이렇게 수정

        }}
    }, {
      onError : (error) => {
        console.log(error)
        console.error(error)
      }
    })

    // 매물 id 기억하고 있기
    useEffect( () => {
          // console.log("real_estate_id🐣🐣" , item.id)  // 매물 id 확인
      setEstateID(item.id)
    } , [item.id])


    // 근처 지하철 파싱해서 저장하기
    useEffect( () => {

      const parsedNearSubway = JSON.parse(item.nearSubway)
      // console.log("parsedNearSubway🚀🚀" , parsedNearSubway)
      // console.log("parsedNearSubway🚀🚀" , parsedNearSubway[0])
      // console.log("parsedNearSubway🚀🚀" , parsedNearSubway[1])
      if (parsedNearSubway) {
        setNearSubway_1(parsedNearSubway[0])
        setNearSubway_2(parsedNearSubway[1])
      }
    } )



    const handleLikeBtn = (index) => {

      // console.log("좋아요 버튼 클릭☝☝" , index)
      // 만약, 로그인 되었으면, 나오게 하고, 로그아웃 되면, 안 되게 하기 ✅✅
      if (!isLoggedIn) {
        console.log("isLoggedIn🚀🚀" , isLoggedIn)
        navigate("/login")
        return
      }

      // 클릭된 유저가 없으면 |
      if(estateLike && estateLike[0] == null) {
        addLikeBtnMutation.mutate({real_estate_id : estateID})
      } else {
        delLikeBtnMutation.mutate({real_estate_id : estateID})
      }

      console.log("클릭된 estateID" , estateID)
      // user_id : 이건 controller 에서 미들웨어로 받을거고
      // real_estate_id : 이걸 여기에서 받아서 넘길 것 임

    }

    useEffect( () => {
      // insert 할 때, 굳이 파일 경로를 앞에 안 붙여준 경우 -> 파싱 없이 넣어야 나옴
        // console.log("item.img_1 담긴 것 👲👲👲" , item.img_1) // 👉 nobroker_erd_1692354792331.png

        // 🔵 테스트 | 로컬 테스트용 |
        // setEstateImgUrl(item.img_1);   // substr(12) = 앞에 파일 경로 지워주기 ✅✅ | 이건 테스트용

        // 🚀 배포 | insert 할 때, 경로 붙인 경우 -> 파싱 해야 나옴 | 배포용 🚀
        setEstateImgUrl(item.img_1.substr(12));   // substr(12) = 앞에 파일 경로 지워주기 ✅✅
    },[estateImgUrl , item.img_1])



    useEffect( () => {
      // console.log("item.built_year" , item.year_built)


      if( 2018 <= item.year_built && item.year_built <= 2023) {
        setEstateYear("신축(5년이내), ")
      } else if (2013 <= item.year_built && item.year_built < 2018) {
        setEstateYear("준신축(10년이내), ")
      } else {
        setEstateYear("")
      }
    } , [])

    useEffect(() => {
      console.log('Updated arrCloseStation:', arrCloseStation);
    }, [arrCloseStation]);


    return (

      <CardItemWrapper>
        <CardItem  >

          <ImgWrap>

            <ImgThumbnail>
              <img src={`${serverUrl}estate_imgs/${estateImgUrl}`} />
            </ImgThumbnail>

            <LikeBtnWrap onClick={ () => handleLikeBtn(index) } >
              {
                isLoggedIn && estateLike && estateLike[0] != null ? <img src={detail_heart}></img> : <img src={detail_emptyheart} ></img>
              }

            </LikeBtnWrap>

          </ImgWrap>


          <InfoWrap onClick={ () => navigate(`/detail/${estateID}`)} >

            {/* deposit , 거래 유형 데이터를 가져와야함*/}
            <HeaderPrice>
              매매  { Math.floor(estatePrice/100000000) < 1 ? " " : `${Math.floor(estatePrice/100000000)}억`}
                      {/* 1억 미만이면 -> 억 단위 표기 안 함 | 1억 이상이면, 억 단위만 가져와서 표기함 */}
              {estatePrice % 100000000 === 0 ? " " : `${Math.floor((estatePrice % 100000000) / 10000)}만원`}
                  {/* 1억 단위로 떨어지면 -> 깔끔하게 " " 으로 표시 */}
                  {/* 만원 단위로 떨어지면 -> 최대 천만원 단위 부터 남았을 것 이므로, 10000 만원 단위로 나눈다. */}

            </HeaderPrice>

            {/* real_estate 에서 > type 가져와서 넣어주면 됨 ex) 아파트, 주택, 등  */}

            <RoomType>
              {/* {estateRoomType} */}
              {`${estateRoomType}`}
            </RoomType>

              {/* 특징 : 1) 신축 여부 (신축 0~5년, 준신축 5년~10년, ) 2) 면적 */}
              {/* m2 이거 변환해야 함 */}
              {/* const squareMeter = "m\u00B2"; */}
            <RoomDesc>
              {`${estateYear}`}
              {`${estateArea}m²`}{`(${Math.floor(estateArea/3)}평)`}
            </RoomDesc>

            {/* 특징 : 1) 지하철 3분 거리 2) 공원근처 | 구글 맵에서 계산해서 보여주면 좋을거 같음 ✅ */}
            <RoomDesc>
              {`${nearSubway_1}역`}, {`${nearSubway_2}역 5km 이내`}

            </RoomDesc>
              {/* 추가 가능 한 것 : 남은 거래 기간 / 댓글 개수 / SNS스럽게 업데이트 해봐도 좋을 듯! */}

            {/* 누가 내놨는지 보여주기 : 1) 일반유저(다방은 방주인이라고 함), 2) 중개인 */}
              <SellerType className={item.User.certificate_user == 0 ? "agent" : "owner"} >
                { item.User.certificate_user == 0 ? "중개인" : "방주인" }     {/* real_setate 테이블에서 seller 의 User 테이블의 certificate_user == 0 이면 -> 중개인 |  */}
              </SellerType>

          </InfoWrap>

        </CardItem>
      </CardItemWrapper>

    )
  }

  export default EstateItem


  /*
    console.log("이 유저가 클릭한 매물 보기🚀🚀" , estateLike[0]) 데이터 들어오는 유형
    {
      "user_id": 1,
      "real_estate_id": 1
  }
  */