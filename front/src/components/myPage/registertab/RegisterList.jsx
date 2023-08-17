import React, { useEffect, useState } from 'react'
import {DateImg,OtherInfo,JustState} from '../checktab/checkstyled'
import { MypageGlobal } from '../Mypage';
import { useContext } from 'react';
import {UpdateBtn, EstateAllInfo} from './registerstyled';
import axios from 'axios';
import { useMutation, useQueryClient,useQuery } from 'react-query';
const RegisterList = ({data}) => {
  const {getmyregisterinfo} =useContext(MypageGlobal);
  const userID = getmyregisterinfo.user_id;
  const [state,setState] = useState("");
  const [btnName,setbtnName] = useState();
  const [btnName2,setbtnName2] = useState();
  console.log(data);
  useEffect(()=>{

    if( data.seller == userID && data.approved == 0 && data.cancel==null && data.completed ==0){
      setState("판매승인");
      setbtnName("승인");
      setbtnName2("판매취소");
    }
    else if(data.seller == userID && data.approved==1 && data.cancel==null && data.completed==0){
      setState("판매중");
      setbtnName("판매취소");
      setbtnName2("");
    }
    else if(data.seller==userID && data.completed==2){
      setState("판매완료");
      setbtnName("");
      setbtnName2("");
    }
    else if(data.seller==userID && data.cancel==userID){
      setState("판매취소");
      setbtnName("재등록");
      setbtnName2("");
    }
    else if(data.buyer==userID && data.approved==0 && data.cancel==null && data.completed ==0){
      setState("승인대기");
      setbtnName("구매취소");
      setbtnName2("");
    }
    else if(data.buyer==userID && data.approved==1 && data.cancel==null && data.completed==0){
      setState("구매중");
      setbtnName("구매취소");
      setbtnName2("");
    }
    else if(data.buyer==userID && data.completed==2){
      setState("구매완료");
      setbtnName("");
      setbtnName2("");
    }
    else if(data.buyer==userID && data.cancel==userID){
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

    const ImgUrl = data.Real_estate.img_1?.split("\\")[2];

    
    
    const transactionStateUpdate = async(el)=>{
      const data = await axios.get("http://localhost:8080/mypage/transactionStateUpdate",{
        params : {el},
        withCredentials : true,
      })
      return data.data;
    }
    const queryClient = useQueryClient();
    

    const mutation = useMutation(transactionStateUpdate,{
      onSuccess : (data)=>{
        console.log("거래 상태 업데이트 완료 ",data)
        if(data=="성공"){

          queryClient.invalidateQueries(['getmyregister'])
          alert('판매 취소가 완료되었습니다.')
        }
        else if(data=='판매취소완료'){
          queryClient.invalidateQueries(['getmyregister'])
          alert('판매 취소가 완료되었습니다.')

        }
        else if(data=='판매자잔고부족'){
          alert("잔고금액이 계약금의 2배보다 적어 판매 취소가 불가능합니다.")
        }
        else if(data=='구매취소완료'){
          queryClient.invalidateQueries(['getmyregister']);
        }
        else if(data=='재등록 완료'){
          queryClient.invalidateQueries(['getmyregister']);

        }
      }
    })
    const customConfirm = (message) => {
      return window.confirm(message);
    };

    const transactionStateUpdateBtn=(btnname,estateId,userID,transactionID,deposit,buyerID,sellerID,approved) =>{
      console.log("params",btnname);

      if(btnname=="승인"){
        mutation.mutate({btnname,estateId,userID,transactionID});
      }
      else if(btnname=="판매취소"){
        if(approved==1){

          if(customConfirm('거래중인 매물을 판매 취소할 경우 계약금 2배를 구매자에게 배상합니다.')){

            mutation.mutate({btnname,estateId,userID,transactionID,deposit,buyerID,sellerID});
          }
          else{
            return;
          }
        }
        else{
          mutation.mutate({btnname,estateId,userID,transactionID,deposit,buyerID,sellerID});
        }


      }
      else if(btnname=="구매취소"){
        if(approved==1){

          if(customConfirm('거래중인 매물을 구매 취소할 경우 계약금을 돌려받을 수 없습니다..')){

            mutation.mutate({btnname,estateId,userID,transactionID,deposit,buyerID,sellerID});
          }
          else{
            return;
          }
        }
        else{
          mutation.mutate({btnname,estateId,userID,transactionID,deposit,buyerID,sellerID});
        }


      }
      else if(btnname=="재등록"){
        mutation.mutate({btnname,estateId,userID,transactionID});
      }
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
        {btnName ? <UpdateBtn onClick={()=>{transactionStateUpdateBtn(btnName,data.Real_estate.id,userID,data.id,data.Real_estate.deposit,data.buyer,data.seller,data.approved)}}>{btnName}</UpdateBtn> :<></>}
        {btnName2 ? <UpdateBtn onClick={()=>{transactionStateUpdateBtn(btnName2,data.Real_estate.id,userID,data.id,data.Real_estate.deposit,data.buyer,data.seller,data.approved)}}>{btnName2}</UpdateBtn> :<></>}
      </JustState>


    </EstateAllInfo>
  )
}

export default RegisterList