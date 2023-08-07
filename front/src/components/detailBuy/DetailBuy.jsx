import React from 'react'
import axios from 'axios'
import { useMutation } from 'react-query';
import { LikeBtn } from './detailBuy.styled';

const DetailBuy = ({estate, seller, like}) => {
    const now = new Date();

    let fakeText = "";
    if (seller.fake_count != 0) {
        fakeText = `해당 판매자는 허위 매물 ${seller.fake_count}회 올렸습니다.`
    }

    const createMutation = useMutation(async (buyForm)=>{
        const { data } = await axios.post("http://localhost:8080/detail/buyEstate", buyForm, {
        withCredentials : true
        });
        return data;
    });

    const clickBuyBtn = () => {
        createMutation.mutate({ real_estate_id : estate.id, transaction_date : document.querySelector("#date_input").value });
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
        <div onClick={clickBuyBtn}>구매 신청</div>
        <LikeBtn>
        {like ? <img src='../../img/"꽉 찬 하트"'  alt ="꽉 찬 하트"></img> : <img src='../../img/"빈하트"' alt ="빈 하트"></img>}
            찜
        </LikeBtn>
        </div>
    </div>
  )
}

export default DetailBuy