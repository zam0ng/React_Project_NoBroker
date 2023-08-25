import React from 'react'
import axios from '../../Axios'
import { useMutation, useQuery } from 'react-query';
import { LikeBtn, BuyBtn, Title, Content, ContentDiv, LikeBtnDiv, UserImg, Divider } from './detailBuy.styled';
import { detail_heart, detail_emptyheart, userimg } from '../../img/index'
import { serverUrl } from 'components/serverURL';
import { useAuth } from 'AuthContext';

const DetailBuy = ({estate, seller, like, queryClient}) => {
    const now = new Date();
    const { isLoggedIn, logout } = useAuth();

    // 구매
    const createBuyMutation = useMutation(async (buyForm)=>{
        const { data } = await axios.post("/detail/buyEstate", buyForm, {
        withCredentials : true
        });
        return data;
    }, {
        onSuccess : (data) => {
            if (data.message && data.message == "성공") {
                alert("구매 신청 성공");
                queryClient.invalidateQueries('estate');
            } else if (data.message && data.message == "거래할 수 없는 매물입니다.") {
                alert("거래할 수 없는 매물입니다.");
                queryClient.invalidateQueries('estate');
            } else if (data.message && data.message == "돈 부족") {
                alert("돈이 부족합니다.");
            } else if (data.message && data.message == "본인의 매물은 구매 불가") {
                alert(data?.text);
            } else if (data.message && data.message == "다시 로그인") {
                alert("로그인하세요.");
                logout();
            } else {
                console.log("오류",data);
                alert("오류 발생");
            }
        }
    });

    // 구매 신청 버튼 눌렀을때 실행되는 함수
    const clickBuyBtn = () => {
        if (!isLoggedIn) {
            alert("로그인하세요.");
            return;
        }

        if (estate.state != 0) {
            return;
        } else if (!document.querySelector("#date_input").value) {
            alert("거래 기간을 선택해주세요.");
            return;
        } else {
            // console.log("date", document.querySelector("#date_input").value);
            createBuyMutation.mutate({ real_estate_id : estate.id, transaction_date : document.querySelector("#date_input").value });
        }
    }


    // 찜 추가
    const createAddLikeMutation = useMutation(async (likeForm) => {
        const { data } = await axios.post("/detail/like", likeForm, {
        withCredentials : true
        });
        return data;
    }, {
        onSuccess : (data) => {
            if (data.message && data.message == "성공") {
                console.log("찜 추가 성공");

                queryClient.invalidateQueries('estate');
            } else if (data.message && data.message == "다시 로그인") {
                alert("로그인 하세요.");
                logout();
            } else {
                console.log("오류",data);
                alert("오류 발생");
            }
        }
    });


    // 찜 취소
    const createDelLikeMutation = useMutation(async (delLikeForm)=>{
        const { data } = await axios.post("/detail/delLike", delLikeForm, {
        withCredentials : true
        });
        return data;
    }, {
        onSuccess : (data) => {
            if (data.message && data.message == "성공") {
                console.log("찜 삭제 성공");

                queryClient.invalidateQueries('estate');
            } else if (data.message && data.message == "다시 로그인") {
                alert("로그인 하세요.");
                logout();
            } else {
                console.log("오류",data);
                alert("오류 발생");
            }
        }
    });


    const clickLikeBtn = () => {
        if (!isLoggedIn) {
            alert("로그인하세요.");
            return;
        }

        if (like.user_like) {
            // 찜 취소
            createDelLikeMutation.mutate({real_estate_id : estate.id});
        } else {
            // 찜 추가
            createAddLikeMutation.mutate({real_estate_id : estate.id});
        }
    }

  return (
    <div style={{position : "absolute", width:"100%", top:"50%", left: "50%", transform:"translate(-50%,-50%)"}}>

        {/* 일주일 간격 */}
        <h2>구매 신청</h2>
        <ContentDiv><Title>거래 기간</Title> <input type="date" id='date_input' min={new Date(now.setDate(now.getDate() + 7)).toISOString().split('T')[0]}/></ContentDiv>
        {/* <input type="date" id='date_input' min={new Date(now.setDate(now.getDate() + 7)).toISOString().split('T')[0]}/> */}

        <div>
        {/* 구매 가능 상태 아니면 회색 버튼 */}
        <div style={{display : 'flex', justifyContent: 'center'}}>
            {estate.state==0 ? <BuyBtn onClick={clickBuyBtn} backgroundColor = {"orange"}>신청하기</BuyBtn> : <BuyBtn onClick={clickBuyBtn} backgroundColor = {"gray"}>구매 불가</BuyBtn>}
        </div>

        <Divider />

        <h2 style={{marginTop:"40px"}}>판매자 정보</h2>
        {seller.fake_count!=0 ?  <p>해당 판매자는 허위 매물 <span style={{color:"red"}}>{seller.fake_count}</span>회 올린 적이 있습니다.</p> : <></>}
        <UserImg src={seller.user_img ? `${serverUrl}user_imgs/`+seller.user_img?.substr(13) : `${serverUrl}user_imgs/User_Profile.png`} alt="유저 이미지" />
        <ContentDiv><Title>이름</Title> <Content>{seller.user_name}</Content></ContentDiv>
        <ContentDiv><Title>연락처</Title> <Content>{seller.phone}</Content></ContentDiv>

        <LikeBtnDiv>
            <div>{estate.views}번 조회된 매물입니다.</div>
            <LikeBtn onClick={clickLikeBtn}>
            {like.user_like ? <img src={detail_heart} alt ="꽉 찬 하트"></img> : <img src={detail_emptyheart} alt ="빈 하트"></img>}
            {like.likes}
            </LikeBtn>
        </LikeBtnDiv>
        </div>

    </div>
  )
}

export default DetailBuy