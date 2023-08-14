import React, { useEffect, useState } from 'react'
import {DateImg,OtherInfo,JustState} from '../checktab/checkstyled'
import { MypageGlobal } from '../Mypage';
import { useContext } from 'react';
import {UpdateBtn, EstateAllInfo} from './registerstyled';
const RegisterList = ({data}) => {
  const {getmyregisterinfo} =useContext(MypageGlobal);
  const [state,setState] = useState("");
  const [btnName,setbtnName] = useState();
  const [btnName2,setbtnName2] = useState();
  useEffect(()=>{

    if( data.seller == getmyregisterinfo.user_id && data.approved == 0 && data.cancel==null && data.completed ==0){
      setState("판매승인");
      setbtnName("승인");
      setbtnName2("판매취소");
    }
    else if(data.seller == getmyregisterinfo.user_id && data.approved==1 && data.cancel==null && data.completed==0){
      setState("판매중");
      setbtnName("판매취소");
      setbtnName2("");

    }
    else if(data.seller==getmyregisterinfo.user_id && data.completed==1){
      setState("판매완료");
      setbtnName("");
      setbtnName2("");


    }
    else if(data.seller==getmyregisterinfo.user_id && data.cancel==getmyregisterinfo.user_id){
      setState("판매취소");
      setbtnName("");
      setbtnName2("");


    }
    else if(data.buyer==getmyregisterinfo.user_id && data.approved==0 && data.cancel==null && data.completed ==0){
      setState("승인대기");
      setbtnName("구매취소");
      setbtnName2("");


    }
    else if(data.buyer==getmyregisterinfo.user_id && data.approved==1 && data.cancel==null && data.completed==0){
      setState("구매중");
      setbtnName("구매취소");
      setbtnName2("");


    }
    else if(data.buyer==getmyregisterinfo.user_id && data.completed==1){
      setState("구매완료");
      setbtnName("");
      setbtnName2("");


    }
    
    else if(data.buyer==getmyregisterinfo.user_id && data.cancel==getmyregisterinfo.user_id){
      setState("구매취소");
      setbtnName("");
      setbtnName2("");


    }
   
  },[data])
  let ta;
  if(data.completed==0){
    ta = new Date(data.createdAt);
  }
  else{
    ta = new Date(data.updatedAt);
  }

    const options = {
        timeZone: "Asia/Seoul",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    };

    const formatter = new Intl.DateTimeFormat("en-US", options);
    const formattedDate = formatter.format(ta);

    const revisedFormattedDate = formattedDate.replace(
        /(\d{2})\/(\d{2})\/(\d{4})/,
        "$3/$1/$2"
    );
    //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

    const ImgUrl = data.Real_estate.img_1.split("\\")[2];

    function taft(e) {
      console.log("params",e)
    }
  return (
    <EstateAllInfo>
      <DateImg>
        <span>{revisedFormattedDate}</span>
        <img src={`http://localhost:8080/estate_imgs/${ImgUrl}`}></img>
      </DateImg>
      <OtherInfo>
        <div>{data.Real_estate.balance}만원</div>
        <div>{data.Real_estate.jibun}&nbsp;{data.Real_estate.additional_address}</div>
        <div><span>{data.Real_estate.area}㎡</span><span>,&nbsp;{data.Real_estate.type}</span></div>
      </OtherInfo>
      <JustState>
        <span>{state}</span>            
        {btnName ? <UpdateBtn onClick={()=>{taft(btnName)}}>{btnName}</UpdateBtn> :<></>}
        {btnName2 ? <UpdateBtn onClick={()=>{taft(btnName2)}}>{btnName2}</UpdateBtn> :<></>}
      </JustState>


    </EstateAllInfo>
  )
}

export default RegisterList