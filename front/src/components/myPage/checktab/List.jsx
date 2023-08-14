import React, { useEffect, useState } from 'react'
import {DateImg,EstateAllInfo,OtherInfo,JustState} from './checkstyled';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
const List = ({data}) => {
    console.log(data);
    const [isDisplay,setIsDisplay] = useState(false);

    const state = data.accpet === 0 ? "투표중" :
    data.accpet === 1 ? "정상등록" :
    data.accpet === 2 ? "허위판정" :
    data.accpet === 3 ? "투표미달" :
    "투표미달";

    useEffect(() => {
        if (data.accpet === 3) {
          setIsDisplay(true);
        } else {
          setIsDisplay(false);
        }
      }, [data.accpet]);
     
    // createdAt 시간 바꾸기
    let ta = new Date(data.createdAt);

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

    const ImgUrl = data.img_1.split("\\")[2];

    const updateAccept = async(el)=>{
        const data= await axios.get('http://localhost:8080/mypage/resubmit',{
            params :{el},
            withCredentials : true,
        })
        return data.data;
    }
    const queryClient = useQueryClient();
    const mutation =  useMutation(updateAccept,{
        onSuccess :(data)=>{
            console.log("qwejnroqwenroqw",data);
            if(data.msg=="성공"){

                queryClient.invalidateQueries(['users',data.id])
            }
        }
    })

    const resubmit = (el)=>{
        console.log(el);

       mutation.mutate(el);
    }
    

  return (
    <>
    <EstateAllInfo>
        <DateImg>
            <span>{revisedFormattedDate}</span>
            <img src={`http://localhost:8080/estate_imgs/${ImgUrl}`}></img>
        </DateImg>
        <OtherInfo>
            <div>{data.balance}만원</div>
            <div>{data.jibun}&nbsp;{data.additional_address}</div>
            <div><span>{data.area}㎡</span><span>,&nbsp;{data.type}</span></div>
        </OtherInfo>
        <JustState id="juststate">
            <span>{state}</span>            
            {isDisplay ? <button onClick={()=>{resubmit(data.id)}}>재등록</button>:<></>}
        </JustState>

    </EstateAllInfo>

    </>
  )
}

export default List
