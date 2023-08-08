import React from 'react'
import axios from 'axios'
import { useMutation } from 'react-query';
import { LikeBtn, BuyBtn } from './detailBuy.styled';

const DetailBuy = ({estate, seller, like, queryClient}) => {
    const now = new Date();

    let fakeText = "";
    if (seller.fake_count != 0) {
        fakeText = `해당 판매자는 허위 매물 ${seller.fake_count}회 올렸습니다.`
    }

    // 구매
    const createBuyMutation = useMutation(async (buyForm)=>{
        const { data } = await axios.post("http://localhost:8080/detail/buyEstate", buyForm, {
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
            } else {
                console.log("오류",data);
                alert("오류 발생");
            }
        }
    });

    // 구매 신청 버튼 눌렀을때 실행되는 함수
    const clickBuyBtn = () => {
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
        const { data } = await axios.post("http://localhost:8080/detail/like", likeForm, {
        withCredentials : true
        });
        return data;
    }, {
        onSuccess : (data) => {
            if (data.message && data.message == "성공") {
                console.log("찜 추가 성공");

                queryClient.invalidateQueries('estate');
            } else {
                console.log("오류",data);
                alert("오류 발생");
            }
        }
    });


    // 찜 취소
    const createDelLikeMutation = useMutation(async (delLikeForm)=>{
        const { data } = await axios.post("http://localhost:8080/detail/delLike", delLikeForm, {
        withCredentials : true
        });
        return data;
    }, {
        onSuccess : (data) => {
            if (data.message && data.message == "성공") {
                console.log("찜 삭제 성공");

                queryClient.invalidateQueries('estate');
            } else {
                console.log("오류",data);
                alert("오류 발생");
            }
        }
    });


    const clickLikeBtn = () => {
        if (like.user_like) {
            // 찜 취소
            createDelLikeMutation.mutate({real_estate_id : estate.id});
        } else {
            // 찜 추가
            createAddLikeMutation.mutate({real_estate_id : estate.id});
        }
    }

  return (
    <div>
        {fakeText}
        <div>판매자 이름 : {seller.user_name}</div>
        <div>판매자 연락처 : {seller.phone}</div>
        {/* 일주일 간격 */}
        <input type="date" id='date_input' min={new Date(now.setDate(now.getDate() + 7)).toISOString().split('T')[0]}/>
        {/* <input type="date" id='date_input' min={new Date(now.setDate(now.getDate() + 7)).toISOString().split('T')[0]}/> */}
        <div>

        {/* 구매 가능 상태 아니면 회색 버튼 */}
        {estate.state==0 ? <BuyBtn onClick={clickBuyBtn} backgroundColor = {"rgba(72, 145, 255)"}>구매 신청</BuyBtn> : <BuyBtn onClick={clickBuyBtn} backgroundColor = {"grey"}>구매 불가</BuyBtn>}
        <LikeBtn onClick={clickLikeBtn}>
        <div>조회수 : {estate.views}</div>
        {like.user_like ? <img src='../../img/"꽉 찬 하트"'  alt ="꽉 찬 하트"></img> : <img src='../../img/"빈하트"' alt ="빈 하트"></img>}
            찜 {like.likes}
        </LikeBtn>
        </div>
    </div>
  )
}

export default DetailBuy